import { UPDATE_SEARCHBAR } from '../actionTypes';
//Searchbar text is updated from blank to user query
export const searchbarText = (state='', action)=> {
  switch (action.type) {
    case UPDATE_SEARCHBAR:{
      return action.payload;
    }
  }
  return state;
};
