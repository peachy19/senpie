import { UPDATE_SEARCHBAR } from '../actionTypes';

export const updateSearchbar = (query, style) => ({
  type: UPDATE_SEARCHBAR,
  payload: query,
  style: style
})