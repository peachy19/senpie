// import axios from 'axios'
//import { FETCH_RESULT, HANDLE_RESULT } from '../actionTypes'
import { HANDLE_RESULT } from '../actionTypes'

// export const search = (query) => ({
//   type: FETCH_RESULT,
//   payload: { content: query }
// });

export const handleResponse = (response) => ({
  type: HANDLE_RESULT,
  payload: response
})
