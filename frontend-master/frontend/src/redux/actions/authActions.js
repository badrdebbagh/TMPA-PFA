import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../../util/setAuth';

export const Registration = (form, navigate) => (dispatch) => {
  axios
    .post('http://localhost:3001/api/register', form)
    .then((res) => {
      navigate('http://localhost:3001/api/login');
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const LoginAction = (form, navigate) => (dispatch) => {
  axios
    .post('http://localhost:3001/api/login', form)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwt', token); // Store the token in local storage
      const decode = jwt_decode(token);
      dispatch(setUser(decode));
      setAuth(token);
      console.log('login action token', token);

      axios
        .get('http://localhost:3001/api/users/current', config)
        .then((res) => {
          setSelectedColumns(res.data.selectedColumns);
        })
        .catch((err) => {
          console.error('Error fetching selected columns:', err);
        });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

// export const LoginAction = (form, navigate) => (dispatch) => {
//   axios
//     .post('http://localhost:3001/api/login', form)
//     .then((res) => {
//       const { token } = res.data;
//       localStorage.setItem('jwt', token);
//       const decode = jwt_decode(token);
//       dispatch(setUser(decode));
//       setAuth(token);
//       console.log('login action token', token);
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

export const Logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({
    type: SET_USER,
    payload: {},
  });
};

export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode,
});
