export class Pokemon {
    
    /*
    TypeScript tiene la opción strictPropertyInitialization que obliga a inicializar propiedades. El constructor cuenta como inicialización
    */
   public readonly id: number;
   public name: string; 

    constructor(id:number, name:string){
        this.id = id; 
        this.name = name; 
    }

    //Otra forma de escribir los atributos con su nivel de acceso
    // constructor(public readonly id:number, public name: string){}


    //Getters
    get imageUrl(): string{
        return `https://pokemon${this.id}.jpg`; 
    }

    scream(){
        console.log(`${this.name.toUpperCase()}!!!!!`);
        // return `${this.name.toUpperCase()}!!!!!`;
    }

}

export const charmander = new Pokemon (1,'pedrito'); 

//id esta como readonly, no debe permitir nuevas asignaciones. El error se vera en el build 
// charmander.id = 2; 

console.log(charmander);
console.log(charmander.imageUrl);
charmander.scream();

