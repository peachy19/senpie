import { FETECH_RESULT } from '../actionTypes'

export const search = (query) => ({
  type: FETECH_RESULT,
  payload: { content: query }
});
