import React, { useContext } from 'react';
import { UserContext } from 'contexts';
import { clearToken } from '../../helpers/utilities';

import './index.css';

export default function Main() {
  const { user, setUser } = useContext(UserContext) || {};
  if (!user) return null;

  const logout = () => {
    setUser(null);
    clearToken();
    // to refresh cached content for the current user.
    window.location = '/';
  };

  return (
    <div className="topbar">
      <div className="left">
          Twitter Logo
      </div>
      <div className="menuItems">
        <div>Home</div>
        <div>Search</div>
        <div>Notification</div>
        <div>Messages</div>
      </div>
      <div className="right">
        <a href="" onClick={logout} >Logout</a>
      </div>
    </div>
  );
}
