// Дії для TODO
export const LOAD_TODOS = 'LOAD_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Дії для виконання
export const loadTodos = () => ({ type: LOAD_TODOS });
export const addTodo = (text) => ({ type: ADD_TODO, text });
export const deleteTodo = (id) => ({ type: DELETE_TODO, id });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });
export const editTodo = (id, text) => ({ type: EDIT_TODO, id, text });
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });
