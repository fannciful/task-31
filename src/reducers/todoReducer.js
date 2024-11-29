import {
    LOAD_TODOS,
    ADD_TODO,
    DELETE_TODO,
    TOGGLE_TODO,
    EDIT_TODO,
    CLEAR_COMPLETED
  } from '../actions/todoActions';
  
  const initialState = {
    todos: [],
    loading: false
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_TODOS:
        return { ...state, loading: true };
        case ADD_TODO:
          if (!action.text || action.text.trim() === '') {
            console.error('Cannot add an empty todo.');
            return state; // Не додаємо порожнє завдання
          }
          return {
            ...state,
            todos: [
              ...state.todos,
              { id: Date.now(), text: action.text.trim(), completed: false }
            ]
          };        
      case DELETE_TODO:
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) };
      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
          )
        };
      case EDIT_TODO:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.id ? { ...todo, text: action.text } : todo
          )
        };
      case CLEAR_COMPLETED:
        return { ...state, todos: state.todos.filter(todo => !todo.completed) };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  