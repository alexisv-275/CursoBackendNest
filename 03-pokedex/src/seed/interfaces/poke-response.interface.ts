//Crear una interfaz para generar un tipado que haga match con el response de la API de pokeapi
export interface PokeResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}
