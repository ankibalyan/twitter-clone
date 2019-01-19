import settings from '../configs';
import { getTokenId, getLocalStorage } from './utilities';

const noop = () => { };

const customHeader = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getTokenId()}`
  };
};

const base = (method, url, data) => {
  let body;
  const apiUrl = new URL(`${settings.apiUrl}${url}`);

  if (method === 'get' && data) {
    Object.keys(data).forEach(key => apiUrl.searchParams.append(key, data[key]));
  } else {
    body = data && JSON.stringify(data);
  }

  return fetch(apiUrl, { method, headers: customHeader(), body })
    .then(response => response.json())
    .then(res => res)
    .catch(error => console.error(error) || { error: 'Server Error' });
};

const SuperFetch = { get: noop, post: noop, put: noop, delete: noop };
['get', 'post', 'put', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});

export default SuperFetch;
