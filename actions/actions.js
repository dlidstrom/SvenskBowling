import ActionTypes from './actionTypes.js'

const addTodo = (text) => {
  return {
    type: ActionTypes.ADD_TODO,
    text
  };
};

const removeTodo = (id) => {
  return {
    type: ActionTypes.REMOVE_TODO,
    id
  };
}

export default {
  addTodo,
  removeTodo
};
