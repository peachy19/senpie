import { UPDATE_SEARCHBAR } from '../actionTypes';

export const searchbarText = (state='', action)=> {
  console.log('Inside search reducer', action);
  switch (action.type) {
    case UPDATE_SEARCHBAR:{
      console.log('update search', action.payload);
      //return [...state, action.payload];
      return action.payload;
    }
  }
  return state;
};
