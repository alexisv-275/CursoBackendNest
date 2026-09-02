import axios from "axios";


export interface Httpdapter{
    get<T>(url:string):Promise<T>;
}

export class PokeApiFetchAdapter implements Httpdapter{
    // T representa el tipo de dato que esperamos recibir.
    //Promise<T> significa que el método no devuelve el dato inmediatamente, sino una promesa que posteriormente entregará un dato de tipo T
    async get<T> (url:string):Promise<T>{
        // fetch realiza la petición a la URL y devuelve una respuesta.
        const resp = await fetch(url); 
        // json() convierte el contenido JSON en un objeto de JavaScript.
        const data: T = await resp.json();
        console.log('FETCCH');
        
        return data; 
    }
}



export class PokeApiAdapter implements Httpdapter {

    private readonly axios = axios;

    async get<T> (url:string){

        const { data } = await this.axios.get<T>(url);
        console.log('AXIOS');
        return data; 
    }

    async post (url:string, data:any){
        
    }
    async patch (url:string, data:any){
        
    }
    async delete (url:string){
        
    }
}