import React from 'react';
import './index.css';

import useSetState from '../../hooks/useSetState';

export default function Main({ onSubmit }) {
  const [state, setState] = useSetState({ text: '' });

  const handleInput = (name) => ({ target }) => setState({ [name]: target.value });
  const submitForm = () => {
    onSubmit(state);
    setState({ text: '' })
  };

  return (
    <div className="tweetForm">
      <div className="tweetArea">
        <div className="inputDiv" >
            <textarea placeholder="What's happening?" onChange={handleInput('text')} />
        </div>
        <div className="submitWrapper">
          <button className="primary-btn" type="submit" onClick={submitForm} >Tweet</button>
        </div>
      </div>
    </div>
  )
}
