import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        loggedInUser: action.payload,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const LoginPage = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    loggedInUser: null,
  });
  const { loading, error, loggedInUser } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const { data } = await axios(
        `https://jsonplaceholder.typicode.com/users?email=${email}&password=${password}`
      );
      console.log("login ", data);
      if (data.length > 0) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data[0] });
      } else {
        dispatch({ type: "LOGIN_FAIL", payload: "Invalid email or password" });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    console.log("loggedInUser---------------", loggedInUser);
    if (loggedInUser) {
      console.log("loggedInUser inside---------------", loggedInUser);
      return history.push("/profile");
      //return <Redirect to='/profile'></Redirect>;
    }
  }, [loggedInUser]);
  return (
    <div>
      <h1>Login User</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='formItem'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='formItem'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='formItem'>
          <label></label>
          <button>Login</button>
        </div>
        {loading && (
          <div className='formItem'>
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className='formItem'>
            <label></label>
            <span className='error'>{error}</span>
          </div>
        )}
        <div className='formItem'>
          <label></label>
          <span>
            New user? <Link to='/register'>Register</Link>
          </span>
        </div>
        <div className='formItem'>
          <label></label>
          <span>or use email: Shanna@melissa.tv password: 123</span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
