import { FETECH_RESULT, HANDLE_RESULT } from '../actionTypes';
import axios from 'axios';

const searchReducer = (state='hi', action)=> {
  switch (action.type) {
    case FETECH_RESULT:
      return 'FETCHING';
    case HANDLE_RESULT:
      return action.payload;
    default:
      return 'DEFINED'
  }
}
export default searchReducer