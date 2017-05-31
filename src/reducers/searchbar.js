import { UPDATE_SEARCHBAR } from '../actionTypes';
//Searchbar text is updated from blank to user query
export const searchbar = (state={}, action)=> {
  switch (action.type) {
    case UPDATE_SEARCHBAR: {
      const { query } = action;
      return {
        text: query
      }
    }
  }
  return state;
};
