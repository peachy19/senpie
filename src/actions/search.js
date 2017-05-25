import axios from 'axios'
import { FETECH_RESULT, HANDLE_RESULT } from '../actionTypes'

export const search = (query) => ({
  type: FETECH_RESULT,
  payload: { content: query }
});

const handleResponse = (response) => ({
  type: HANDLE_RESULT,
  payload: response,
})

export const searchAndGetResults = (query) => ((dispatch) => {
  // Signal that we're starting a search.
  // dispatch(search(query));

  // Make my request
  axios.get(`http://localhost:8080/search/${query}`)
          .then(function(response) {
            dispatch(handleResponse(response.data.data));
          }).catch(function(error) {
            console.log(error);
          });
})