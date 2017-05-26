import { UPDATE_SEARCHBAR } from '../actionTypes';

export const updateSearchbar = (query) => ({
  type: UPDATE_SEARCHBAR,
  payload: query
})