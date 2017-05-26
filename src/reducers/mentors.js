import { FETCH_RESULT, HANDLE_RESULT } from '../actionTypes';

export const mentors = (state=[], action)=> {
  console.log('Inside search reducer', action);
  switch (action.type) {
    case FETCH_RESULT:{
      return 'FETCHING';
    }
    case HANDLE_RESULT:{
      console.log('handle results', action.payload);
      //return [...state, action.payload];
      return action.payload;
    }
  }
  return state;
};
