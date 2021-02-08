import { Todo }     from "../classes/todo.class";
import {todoList}   from '../index';

//referencias en el html
const divTodoList       = document.querySelector('.todo-list');
const textInput         =  document.querySelector('.new-todo');
const btnBorrarTodos    = document.querySelector('.clear-completed');
const ulFilter          = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');


export const crearTodoHTML = (todo) => {

    const htmlTodo = `
            <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${todo.nombreTarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
            </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo ;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//EVENTOS   
textInput.addEventListener('keyup', ({target, keyCode})=>{
    if(keyCode === 13 && target.value.length > 0){
        
        const nuevoTodo = new Todo(target.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        textInput.value = '';
    }
    
});

divTodoList.addEventListener('click', (event)=>{
    

    const nombreElemento    = event.target.localName; //input,label,button
    const todoElemento      = event.target.parentElement.parentElement; //obtenemos el elemento padre en este caso es <li></li>
    const todoId            = todoElemento.getAttribute('data-id'); //obtenemos el id 
    


    if(nombreElemento.includes('input')){//hizo click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')

    }else if(nombreElemento.includes('button')){//hay que borrar la tarea
        todoList.eliminarTodo(todoId);
        
        divTodoList.removeChild(todoElemento);
    }
    

});

btnBorrarTodos.addEventListener('click',()=>{

    todoList.eliminarCompletados();
    /**
     * Esta es una forma que se me ocurrio, creando una constante y llenandola con las
     * etiquetas <li></li> que esten con el atributo completed, luego se itera para borrarlas
     */
    // const contenedorTareasCompletadas = document.querySelectorAll('.completed');
    // for(let i = 0 ; i < contenedorTareasCompletadas.length ; i++){
        
    //     contenedorTareasCompletadas[i].remove();
    // }

    for(let i = divTodoList.children.length-1 ; i >=0 ; i--){

        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }
    
    
});

ulFilter.addEventListener('click', (e)=>{
    
    const filtro = e.target.text;
    
    if(!filtro){ return;}
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected')
    
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados' :
                if(!completado){
                    elemento.classList.add('hidden');
                }
        }
    }
});