import React from 'react';
import './auth.css';

import useSetState from '../../hooks/useSetState';

export default function Main({ changeForm, onSubmit }) {
  const [state, setState] = useSetState({ uname: '', pwd: '' });
  const handleInput = (name) => ({ target }) => setState({ [name]: target.value });
  const submitForm = () => onSubmit(state);

  return (
    <div className="signupForm">
      <div className="formTitle">Signup to continue</div>
      <div className="signupFields">
        <div className="inputDiv" >
          <input placeholder="Your name" onChange={handleInput('name')} />
        </div>

        <div className="inputDiv" >
          <input placeholder="Username, unique handle to identify you" onChange={handleInput('uname')} />
        </div>

        <div className="inputDiv" >
          <input placeholder="Email" onChange={handleInput('email')} />
        </div>

        <div className="inputDiv" >
          <input type="password" placeholder="Password" onChange={handleInput('pwd')} />
        </div>

        <div className="submitWrapper">
          <button className="primary-btn" type="submit" onClick={submitForm} >Sign up</button>
          <div> or </div>
          <a onClick={changeForm} >Login</a>
        </div>
      </div>
    </div>
  )
}
