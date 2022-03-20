/* Modelo para manejar la información de Hereo (creación de una clase Heroe)*/

// lo exportamos para permitir usarlo 
export class HeroeModel {
    
    id?: string;
    nombre!: string;
    poder!: string;
    vivo: boolean;

    constructor() {

        //iniciamos el booleano "vivo" en true
        this.vivo = true;
    }
}