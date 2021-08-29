import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:
const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_SINGLE_STUDENT = 'GOT_SINGLE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'


// ACTION CREATORS go here:
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students
});

const gotSingleStudent = (student) => ({
  type: GOT_SINGLE_STUDENT,
  student
});

const _deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    student
  }
}


// THUNK CREATORS go here:
export const fetchStudents = () => async (dispatch) => {
  const {data} = await axios.get('/api/students');
  dispatch(gotStudents(data));
}

export const fetchSingleStudent = (id) => async (dispatch) => {
  const {data} = await axios.get(`/api/students/${id}`);
  dispatch(gotSingleStudent(data));
}

export const deleteStudent = (id, history) => {
  return async (dispatch) => {
    const {data} = await axios.delete(`/api/students/${id}`);
    dispatch(_deleteStudent(data))
    history.push('/');
  }
}


const initialState = {
  students: [],
  singleStudent: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return {
        ...state,
        students: action.students
      }
    case GOT_SINGLE_STUDENT:
      return {
        ...state,
        singleStudent: action.student
      }
    case DELETE_STUDENT:
      const updatedStudents = state.students.filter(student => student.id !== action.student.id)
      return {
        ...state, students: updatedStudents
      }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
