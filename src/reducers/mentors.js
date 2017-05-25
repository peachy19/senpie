import { SEARCH_COMPLETED, ADD_MENTOR } from '../actionTypes';

export const mentors = (state = [], { type, ...payload }) => {
  switch(type) {
    case SEARCH_COMPLETED: {
      return payload.data;
    }
    case ADD_MENTOR: {
      return [...state, payload];
    }
  }
  return state;
};