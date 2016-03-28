import { ADD_TODO, REMOVE_TODO } from './actionTypes'

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        {
          text: action.text,
          id: action.id
        }
      ];
    }
    case REMOVE_TODO: {
      return state.filter(x => x.id !== action.id);
    }
    default: {
      return state;
    }
  }
}

export default todos;
