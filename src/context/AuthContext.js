import * as SecureStore from "expo-secure-store";
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({email, password}) => {

    const options = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    fetch(API_URL + "/register", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });

    console.log('Signup');
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    fetch('https://cas.contrivesoftware.com/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "service_guid": "8ade89e5debe4f629fe039274c5d5158",
        "service_secret": "194617a3268c467e825eddd8a8bd7f9a"
      }),
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: 'signin',
        payload: {
          token: data.token,
          email,
        },
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log('Signin');
    
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);