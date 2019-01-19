import React, { useState, useEffect } from 'react';

import { recentTweets, sendTweet } from '../../helpers/ApiHelper';
import Tweet from '../Tweet';
import NewTweet from '../Tweet/New';

export default function Main() {
  const [ tweets, setTweets ] = useState([]);

  const getRecentTweets = async function getRecentTweetsAsync() {
    const res = await recentTweets();
    if (res && res.status === 1 && res.data) {
      setTweets(res.data);
    }
  }
  useEffect(() => {
    getRecentTweets();
  }, []);

  const submitTweet = async (input) => {
    console.log({input})
    const res = await sendTweet(input);
  }

  const renderTweets = () => {
    console.log({tweets})
    if (!Array.isArray(tweets) || !tweets.length) return null;
    return tweets.map((t) => <Tweet key={t.id} tweet={t} />)
  }

  return (
    <div className="page">
      <div className="newTweetWrapper">
        <div className="avatar"></div>
        <NewTweet onSubmit={submitTweet} />
      </div>
      {renderTweets()}
    </div>
  )
}
