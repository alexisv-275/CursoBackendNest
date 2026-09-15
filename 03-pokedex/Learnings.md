# Aprendizajes del dia: adaptadores y paginacion

## 1. Adaptador HTTP

La aplicacion necesita hacer peticiones HTTP, pero no queremos que cada servicio dependa directamente de Axios. Para eso definimos un contrato mediante una interfaz:

```ts
export interface HttpAdapter {
	get<T>(url: string): Promise<T>;
}
```

La interfaz dice que cualquier adaptador compatible debe tener un metodo `get` que reciba una URL y devuelva una `Promise` con el tipo indicado.

Luego creamos una implementacion concreta usando Axios:

```ts
@Injectable()
export class AxiosAdapter implements HttpAdapter {
	private axios: AxiosInstance = axios;

	async get<T>(url: string): Promise<T> {
		const { data } = await this.axios.get<T>(url);
		return data;
	}
}
```

`AxiosAdapter` es un adaptador porque presenta Axios mediante la interfaz comun `HttpAdapter`. Si en el futuro queremos usar `fetch` u otra libreria, podemos crear otra clase que implemente la misma interfaz sin cambiar los servicios que consumen `HttpAdapter`.

## 2. Proveedor e inyeccion en NestJS

Para que Nest pueda crear y entregar `AxiosAdapter`, lo registramos como proveedor y lo exportamos desde `CommonModule`:

```ts
@Module({
	providers: [AxiosAdapter],
	exports: [AxiosAdapter],
})
export class CommonModule {}
```

- `providers` le dice a Nest que `AxiosAdapter` puede ser creado e inyectado.
- `exports` permite que otros modulos que importen `CommonModule` puedan utilizarlo.

En `SeedModule` se importa `CommonModule`, y `SeedService` recibe el adaptador en su constructor:

```ts
constructor(
	private readonly pokeService: PokemonService,
	private readonly http: AxiosAdapter,
) {}
```

Despues, el servicio puede hacer la peticion sin crear manualmente el adaptador:

```ts
const data = await this.http.get<PokeResponse>(
	'https://pokeapi.co/api/v2/pokemon?limit=650',
);
```

El flujo completo es:

```text
SeedService -> AxiosAdapter -> Axios -> PokeAPI
```

La ventaja es que `SeedService` sabe que necesita un objeto con `get`, pero no tiene que conocer los detalles internos de Axios.

## 3. Query parameters y paginacion

Una peticion puede incluir parametros en la URL:

```http
GET /api/v2/pokemon?limit=10&offset=20
```

- `limit=10`: cantidad maxima de resultados que queremos recibir.
- `offset=20`: cantidad de documentos que queremos saltar antes de comenzar a devolver resultados.

Creamos un DTO para describir y validar esos parametros:

```ts
export class PaginationDto {
	@IsPositive()
	@IsOptional()
	@Min(1)
	limit?: number;

	@IsPositive()
	@IsOptional()
	offset?: number;
}
```

En el controlador, `@Query()` extrae los query parameters y los entrega agrupados en `paginationDto`:

```ts
@Get()
findAll(@Query() paginationDto: PaginationDto) {
	return this.pokemonService.findAll(paginationDto);
}
```

El recorrido es:

```text
URL con query params
	-> @Query()
	-> PaginationDto
	-> PokemonService.findAll()
	-> consulta a MongoDB
```

## 4. Configuracion global del ValidationPipe

En `main.ts` configuramos un `ValidationPipe` para que Nest valide y prepare los datos recibidos:

```ts
app.useGlobalPipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		},
	}),
);
```

- `whitelist: true`: conserva solo las propiedades definidas en el DTO.
- `forbidNonWhitelisted: true`: rechaza propiedades que no esten definidas en el DTO.
- `transform: true`: transforma los datos recibidos y crea el objeto del DTO.
- `enableImplicitConversion: true`: convierte tipos cuando es posible. Por ejemplo, convierte el texto `'10'` de la URL en el numero `10`.

Esto es importante porque todo lo que llega por HTTP llega inicialmente como texto, aunque escribamos `?limit=10`. Gracias a la transformacion, el servicio recibe un numero.

## 5. Consulta paginada en Mongoose

En el servicio establecemos valores por defecto cuando no se envian parametros:

```ts
findAll(paginationDto: PaginationDto) {
	const { limit = 10, offset = 0 } = paginationDto;

	return this.pokemonModel
		.find()
		.limit(limit)
		.skip(offset)
		.sort({ no: 1 })
		.select('-__v');
}
```

Cada parte de la consulta cumple una funcion:

- `find()`: busca documentos de Pokemon.
- `limit(limit)`: establece el maximo de documentos que se devolveran.
- `skip(offset)`: omite documentos al principio; sirve para avanzar entre paginas.
- `sort({ no: 1 })`: ordena por el numero del Pokemon de forma ascendente.
- `select('-__v')`: excluye el campo interno `__v` de la respuesta.

Por ejemplo:

```http
GET /api/v2/pokemon?limit=10&offset=0
```

devuelve los primeros 10 resultados, mientras que:

```http
GET /api/v2/pokemon?limit=10&offset=10
```

omite los primeros 10 y devuelve la siguiente pagina.

`limit` significa "como maximo 10", no "garantiza 10". Si la base de datos solo tiene 9 documentos, se devolveran 9. Tambien pueden devolverse menos si el `offset` deja pocos documentos disponibles.

## Resumen del flujo

```text
Cliente
	-> GET /api/v2/pokemon?limit=10&offset=0
	-> ValidationPipe transforma y valida
	-> @Query() recibe PaginationDto
	-> PokemonController llama a PokemonService
	-> Mongoose aplica find, limit, skip, sort y select
	-> API devuelve los Pokemon
```

Y para el seed:

```text
SeedService
	-> recibe AxiosAdapter por inyeccion de dependencias
	-> AxiosAdapter usa Axios
	-> Axios consulta la PokeAPI
	-> SeedService prepara los datos
	-> PokemonService los inserta en MongoDB
```
