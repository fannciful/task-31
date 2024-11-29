import { takeEvery, put } from 'redux-saga/effects';
import { LOAD_TODOS, ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, CLEAR_COMPLETED } from '../actions/todoActions';

// Сага для завантаження TODO з бекенду (імітоване)
function* loadTodosSaga() {
  try {
    const response = yield fetch('/api/todos'); // замініть на фактичний API
    const data = yield response.json();
    yield put({ type: 'SET_TODOS', todos: data });
  } catch (error) {
    console.error('Failed to load todos', error);
  }
}

// Сага для додавання TODO
function* addTodoSaga(action) {
  try {
    if (!action.text || action.text.trim() === '') {
      console.error('Cannot add an empty todo.');
      return; // Зупиняємо сагу
    }

    const trimmedText = action.text.trim(); // Видаляємо зайві пробіли

    const response = yield fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: trimmedText }),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo.');
    }

    const newTodo = yield response.json();
    yield put({ type: 'ADD_TODO_SUCCESS', todo: newTodo });
  } catch (error) {
    console.error('Failed to add todo', error);
  }
}


// Сага для видалення TODO
function* deleteTodoSaga(action) {
  try {
    yield fetch(`/api/todos/${action.id}`, { method: 'DELETE' });
    yield put({ type: 'DELETE_TODO_SUCCESS', id: action.id });
  } catch (error) {
    console.error('Failed to delete todo', error);
  }
}

// Сага для помітки про виконання TODO
function* toggleTodoSaga(action) {
  try {
    yield fetch(`/api/todos/${action.id}/toggle`, { method: 'PATCH' });
    yield put({ type: 'TOGGLE_TODO_SUCCESS', id: action.id });
  } catch (error) {
    console.error('Failed to toggle todo', error);
  }
}

function* watchTodos() {
  yield takeEvery(LOAD_TODOS, loadTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
  yield takeEvery(TOGGLE_TODO, toggleTodoSaga);
}

export default watchTodos;
