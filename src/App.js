import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, editTodo, clearCompleted } from './actions/todoActions';
import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="add" onClick={handleAddTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {todo.text}
            <button className="delete" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            <button className="edit" onClick={() => dispatch(editTodo(todo.id, prompt('Edit Todo:', todo.text)))}>Edit</button>
          </li>
        ))}
      </ul>

      <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>Clear Completed</button>
    </div>
  );
};

export default App;
