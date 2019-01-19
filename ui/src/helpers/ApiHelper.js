import SuperFetch from './superFetch';
const defaultError = 'Something went wrong, Please try again later!';

export async function register(input) {
  return await SuperFetch.post('auth/register', input).then(response => {
    return response;
  });
}

export async function login(input) {
  return await SuperFetch.post('auth/login', input).then(response => {
    return response;
  });
}

export async function getProfile() {
  return await SuperFetch.get('auth').then(response => {
    return response;
  });
}

export async function sendTweet({ text }) {
  const data = { text };

  return await SuperFetch.post('tweet/send', data).then(response => {
    return response;
  });
}

export async function recentTweets() {
  return await SuperFetch.get('tweet').then(response => {
    return response;
  });
}

export async function userTweets(input) {
  return await SuperFetch.get('tweet/sent', input).then(response => {
    return response;
  });
}

export async function followUser(input) {
  return await SuperFetch.post('user/follow', input).then(response => {
    return response;
  });
}
