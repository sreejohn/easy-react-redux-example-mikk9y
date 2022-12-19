import axios from 'axios';
const URL = `https://jsonplaceholder.typicode.com/todos`;

export const getUsers = () => async (dispatch) => {
  const result = await axios.get(URL);
  dispatch({ type: 'USERS', payload: result.data });
};
export const getUsers1 = (data) => async (dispatch) => {
  console.log('data..', data)
  dispatch({ type: 'USERS', payload: data });
};