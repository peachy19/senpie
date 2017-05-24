import { FETECH_RESULT } from '../actionTypes'

const searchReducer = (state='', action)=> {
  switch (action.type) {
    case FETECH_RESULT:
      console.log(action.payload.content);
      return '';
    default:
      return 'UNDEFINED'
  }
}
export default searchReducer