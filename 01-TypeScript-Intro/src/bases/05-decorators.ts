/*El Decorador un decorador es una función que modifica o reemplaza una clase.*/


/**
 * Decoradores: añaden capacidades o reglas sin modificar directamente el código original.
 */
class NewPokemon {
    public readonly id: number;
    public name: string;

    constructor(id:number, name:string){
        this.id = id; 
        this.name = name; 
    }

    scream(){
        console.log(`NO QUIERO!!!!`);
    }
    
    speak(){
        console.log(`NO QUIERO HABLAR`);
    }
}

const MyDecorator = () => {
    return (target:Function) => {
        // console.log(target);
        return NewPokemon;
        
    }
}

@MyDecorator()
export class Pokemon {

    public readonly id: number;
    public name: string; 

    constructor(id:number, name:string){
        this.id = id; 
        this.name = name; 
    }

    scream(){
        console.log(`${this.name.toUpperCase()}!!!!!`);
    }
    speak(){
        console.log(`${this.name}`);
    }
}
    
export const charmander = new Pokemon(4, 'Patricio');
charmander.scream();
charmander.speak();