import { STUDENT_LOG_IN, MENTOR_LOG_IN } from '../actionTypes';
//Searchbar text is updated from blank to user query
export const userLogIn = (state={id:1}, action)=> {
  switch (action.type) {
    case STUDENT_LOG_IN:
      return {
        id: action.payload
      }
      break;
    default:
      return state;
  }
};
