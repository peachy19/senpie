import { STUDENT_LOG_IN, MENTOR_LOG_IN } from '../actionTypes';

export const userLogIn = (userId) => ({
  type: STUDENT_LOG_IN,
  payload: userId,
})

export const mentorLogIn = (userId) => ({
  type: MENTOR_LOG_IN
})
