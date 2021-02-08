export class Todo{

    static fromJson({id, nombreTarea, completado, creado}){

        const tempTodo      = new Todo(nombreTarea);
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.id         = creado;
        
        return tempTodo;
    }

    constructor(nombreTarea){

        this.nombreTarea = nombreTarea;
        this.id         = new Date().getTime(); // 13246513255
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase(){
        console.log(`${this.nombreTarea} - ${this.id}`);
    }
}