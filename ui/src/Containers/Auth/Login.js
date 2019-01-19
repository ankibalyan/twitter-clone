import React from 'react';
import './auth.css';

import useSetState from '../../hooks/useSetState';

export default function Main({ changeForm, onSubmit }) {
  const [state, setState] = useSetState({ uname: '', pwd: '' });

  const handleInput = (name) => ({ target }) => setState({ [name]: target.value });
  const submitForm = () => onSubmit(state);

  return (
    <div className="loginForm">
      <div className="formTitle">Login to continue</div>
      <div className="formFields">
        <div className="inputDiv" >
          <input placeholder="Username or email" onChange={handleInput('uname')} />
        </div>
        <div className="inputDiv" >
          <input type="password" placeholder="Password" onChange={handleInput('pwd')} />
        </div>

        <div className="submitWrapper">
          <button className="primary-btn" type="submit" onClick={submitForm} >Login</button>
          <div> or </div>
          <a onClick={changeForm} >Signup</a>
        </div>
      </div>
    </div>
  )
}
