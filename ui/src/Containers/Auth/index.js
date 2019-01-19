import React, { useState, useContext } from 'react';
import './auth.css';

import { UserContext } from 'contexts';
import { setTokenId, clearToken } from 'helpers/utilities';
import { login, register } from '../../helpers/ApiHelper';

import Login from './Login';
import Register from './Register';

export default function Main() {
  const [loginForm, setLoginForm] = useState(true);
  const userCtx = useContext(UserContext);

  const changeFormType = () => setLoginForm(!loginForm);
  const loginFormSubmit = async (input) => {
    const res = await login(input);
    if (res && res.status === 1 && res.data && res.data.token) {
      setTokenId(res.data.token);
      userCtx && userCtx.setUser && userCtx.setUser(res.data.token);
    }
  };
  const signupFormSubmit = async (input) => {
    const res = await register(input);
    console.log(res);
  };

  return (
    <div className="authWrapper">
      <div className="leftWrapper">
        <ul>
          <li>Follow your interests.</li>
          <li>Hear what people are talking about.</li>
          <li>Join the conversation. </li>
        </ul>
      </div>
      <div className="rightWrapper">
        {
          loginForm ?
            <Login changeForm={changeFormType} onSubmit={loginFormSubmit} /> :
            <Register changeForm={changeFormType} onSubmit={signupFormSubmit} />
        }
      </div>
    </div>
  )
}
