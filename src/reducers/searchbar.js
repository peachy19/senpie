import { UPDATE_SEARCHBAR } from '../actionTypes';
//Searchbar text is updated from blank to user query
export const searchbar = (state={}, action)=> {
  switch (action.type) {
    case UPDATE_SEARCHBAR:{
      return {
        text: action.payload,
        style: action.style
      }
    }
  }
  return state;
};
