const tokenKey = 'ttid';

export function setTokenId(token) {
  try {
    setLocalStorage(tokenKey, token);
  } catch (error) {
    // try for cookies here
  }
}

export function getTokenId() {
  let tokenId;
  try {
    tokenId = getLocalStorage(tokenKey);
  } catch (error) {
    // try for cookies
  }

  let tokenData = tokenId && decodeToken(tokenId);
  if (tokenData && tokenData.exp && (Date.now() / 1000) > tokenData.exp) {
    clearToken();
    return null;
  }

  return tokenId;
}

export function clearToken() {
  try {
    removeLocalStorage(tokenKey);
  } catch (error) {
    // handle cookies
  }
}

export function decodeToken(token) {
  try {
    const base64Url = String(token).split('.')[1];
    const base64 = base64Url && base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

export function setLocalStorage(key, value) {
  const safeValue = JSON.stringify(value);
  localStorage.setItem(key, safeValue);
}

export function getLocalStorage(key) {
  let res;
  try {
    res = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
  }
  return res;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
