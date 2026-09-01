export const ids = [1,2,3,4];
//A pesar del error, typescript permite unirlo con el arreglo de números
ids.push("asjajasj");
//Conversión rápida de String a number 
ids.push(+'1');
console.log(ids);

/*
Interfaces
Se crean para definir los tipos especificos de un objeto
*/

interface Pokemon {
    id : number; 
    name : string; 
    age? : number; //? significa que es opcional 
}

export const bulbasaur:Pokemon = {
    id : 1,
    name : 'Bulbasaur',
}
export const charmander:Pokemon = {
    id: 2,
    name: "Charmander"
}

console.log(bulbasaur);

//Al momento de trabajar con un arreglo es necesario especificar que la interfaz será un arreglo de objetos (Pokemon[])

export const pokemones: Pokemon[]= []; 

pokemones.push(charmander, bulbasaur); 

console.log(pokemones);



