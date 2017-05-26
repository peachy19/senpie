import { HANDLE_RESULT } from '../actionTypes';
//Updates mentors state with the query results
export const mentors = (state=[], action)=> {
  console.log('Inside search reducer', action);
  switch (action.type) {
    case HANDLE_RESULT:{
      console.log('handle results', action.payload);
      return action.payload;
    }
  }
  return state;
};
