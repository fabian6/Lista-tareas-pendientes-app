import './styles.css';
import {Todo, TodoList} from './classes/conjuntoClasses'
import {crearTodoHTML} from './js/componentes';

export const todoList = new TodoList();

//crear elementos para cada tarea
todoList.todos.forEach( crearTodoHTML);

