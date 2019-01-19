import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import './index.css';
import {  } from 'date-fns';

export default function Main({ tweet }) {
  const time = distanceInWordsToNow(tweet.ts);
  return (
    <div className="tweet">
      <div className="avatar"></div>
      <div className="main">
        <div className="tweetHeader">
          <span className="name">{tweet.by.name}</span>
          <span className="handle">@{tweet.by.uname}</span>
          <span className="time">{time}</span>
        </div>
        <div className="tweetBody">{tweet.text}</div>
        <div className="tweetFooter"></div>
      </div>
    </div>
  );
}
