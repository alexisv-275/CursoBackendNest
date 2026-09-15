# Hoja de aprendizajes: TypeScript Intro

## 02 - Objetos e interfaces

Una `interface` describe la forma que debe tener un valor, normalmente un objeto: sus propiedades, los tipos de esas propiedades y cuáles son obligatorias u opcionales.

```ts
interface Pokemon {
	id: number;
	name: string;
	age?: number;
}
```

En este ejemplo, `Pokemon` indica que un objeto compatible debe tener `id` y `name`, y puede tener `age`. La interfaz no contiene la implementación de métodos ni crea objetos por sí misma. Tampoco existe como constructor en JavaScript cuando se ejecuta el programa: TypeScript la utiliza principalmente para comprobar tipos durante el desarrollo y luego la elimina al compilar.

Por eso, en:

```ts
const bulbasaur: Pokemon = {
	id: 1,
	name: 'Bulbasaur',
};
```

`bulbasaur` sí es un objeto creado mediante un literal de objeto, pero no es una instancia de la interfaz. `: Pokemon` solamente le dice a TypeScript: "comprueba que este objeto tenga la estructura de `Pokemon`". No se usa `new Pokemon(...)` porque una interfaz no es una clase y no puede instanciarse.

La diferencia se ve así:

```ts
interface PokemonData {
	id: number;
	name: string;
}

class Pokemon {
	constructor(public id: number, public name: string) {}
}

const data: PokemonData = { id: 1, name: 'Bulbasaur' };
const pokemon = new Pokemon(1, 'Bulbasaur');
```

`data` es un objeto que cumple un contrato de estructura. `pokemon` es una instancia real de la clase, con el comportamiento definido por ella.

## 03 - Clases, promesas y `async/await`

Una petición HTTP tarda un tiempo que el programa no puede conocer de antemano. Axios devuelve una `Promise<PokeapiResponse>`: una representación de un resultado que todavía puede estar pendiente y que terminará con éxito o con error.

```ts
async getMoves(): Promise<Move[]> {
	const { data } = await axios.get<PokeapiResponse>(url);
	return data.moves;
}
```

Aquí:

- `async` indica que `getMoves` es una función asíncrona y que siempre devuelve una `Promise`. Aunque se retorne directamente un arreglo, se envolverá en una promesa.
- `await` espera el resultado de una promesa antes de continuar con la siguiente línea de esa función. En este caso, permite usar `data` cuando la petición ya terminó.
- Mientras esa petición está pendiente, el programa puede continuar atendiendo otras tareas. `await` no bloquea todo JavaScript; pausa solamente la ejecución de `getMoves` en ese punto.
- Si la promesa se resuelve, `await` produce su valor (`data`). Si falla, lanza el error, que se puede manejar con `try/catch`.

Por tanto, sí: para usar `await` dentro de `getMoves`, el método debe declararse con `async`. Pero "asíncrono" no significa únicamente "usa `await`". Significa que la función inicia o coordina una operación cuyo resultado se obtiene después, y por eso su resultado se comunica mediante una promesa:

```ts
const movesPromise = charmander.getMoves();
// movesPromise todavía representa un resultado pendiente o ya resuelto.

const moves = await charmander.getMoves();
// dentro de otra función async, aquí sí tenemos el arreglo de movimientos.
```

También se puede escribir una función `async` sin `await`; seguirá devolviendo una `Promise`. Y `await` no hace que la petición sea sincrónica ni cambia la duración de la red: solamente hace más sencilla la forma de continuar cuando la promesa termina.

## 04 - Inyección de dependencias y patrón Adaptador

En `04-injection.ts`, la clase `Pokemon` necesita hacer peticiones HTTP, pero no decide internamente si usará Axios o Fetch. Recibe ese objeto desde fuera:

```ts
constructor(id: number, name: string, http: Httpdapter) {
	this.id = id;
	this.name = name;
	this.http = http;
}
```

Eso es inyección de dependencias: `Pokemon` declara qué necesita (`Httpdapter`) y otra parte del programa le entrega una implementación concreta.

```ts
const pokeApiAxios = new PokeApiAdapter();
const charmander = new Pokemon(4, 'Charmander', pokeApiAxios);

// También se podría cambiar la implementación:
const pokeApiFetch = new PokeApiFetchAdapter();
const otroPokemon = new Pokemon(4, 'Charmander', pokeApiFetch);
```
<img width="558" height="407" alt="image" src="https://github.com/user-attachments/assets/a7cf8a56-7ef2-4172-ae8d-6b1683a2e43a" />

<img width="695" height="539" alt="image" src="https://github.com/user-attachments/assets/51650236-723c-4b84-b231-ddae4b3b1212" />


La ventaja no es solo la extensibilidad. `Pokemon` queda desacoplado de Axios y Fetch: conoce el método `get`, pero no necesita conocer cómo se implementa. Esto facilita cambiar la biblioteca HTTP, probar la clase con un objeto simulado (mock) o agregar otra implementación.

En este archivo aparecen dos ideas relacionadas, pero distintas:

1. **Inyección de dependencias:** es la forma de entregar `http` a `Pokemon` desde el constructor. Es una técnica o principio de composición.
2. **Adaptador:** `PokeApiAdapter` y `PokeApiFetchAdapter` traducen el modo particular de trabajar de Axios o Fetch a una interfaz común (`Httpdapter`). Ambos implementan el mismo contrato, por lo que `Pokemon` puede usarlos indistintamente.

Así que el adaptador no está ahí por casualidad: permite que dos APIs diferentes se presenten de la misma manera ante `Pokemon`. La interfaz `Httpdapter` es el contrato; las clases `PokeApiAdapter` y `PokeApiFetchAdapter` son implementaciones/adaptadores; y el constructor de `Pokemon` es el punto donde se inyecta la dependencia.

<img width="1084" height="593" alt="image" src="https://github.com/user-attachments/assets/a3445ea9-c287-405e-af46-72959dc5388c" />


### Resumen

- **Interfaz:** contrato de estructura o comportamiento tipado; no crea instancias en tiempo de ejecución.
- **Clase:** puede definir estado y comportamiento, y se instancia con `new`.
- **Promise:** representa un resultado que estará disponible después.
- **`async`:** hace que una función devuelva una `Promise`.
- **`await`:** espera una promesa dentro de una función `async` sin bloquear todo el programa.
- **Inyección de dependencias:** entrega desde fuera aquello que una clase necesita.
- **Adaptador:** presenta una interfaz común para implementaciones con APIs diferentes.
