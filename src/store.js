import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './reducers/todoReducer';
import watchTodos from './sagas/todoSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  todoReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchTodos);

export default store;
