import React, { Suspense, useState, useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import { UserContext } from 'contexts';
import { getTokenId } from 'helpers/utilities';

import Topbar from 'Containers/Topbar';
import Home from 'Containers/Home';
import Auth from 'Containers/Auth';
import Register from 'Containers/Auth/Register';

const NotFound = () => <p>Opps! Not a Good place to land</p>;

const Routes = () => {
  const [user, setUser] = useState(null);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    const token = getTokenId();
    user !== token && setUser(token);
    userCtx && userCtx.setUser && userCtx.setUser(token);
  }, [user]);

  return (
    <div style={{ height: 'calc(100% - 48px - 56px)' }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Topbar />
        <div>
            <Router>
              <PrivateRoute as={Home} exact path="/" />
              <NotFound default />
            </Router>
        </div>
      </UserContext.Provider>
    </div >
  );
};

const PrivateRoute = (props) => {
  const userCtx = useContext(UserContext);

  let { as: Comp, ...restProps } = props;
  return userCtx && userCtx.user ? <Comp {...restProps} /> : <Auth />;
};

export default Routes;
