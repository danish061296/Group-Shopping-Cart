import React from 'react';
import './css/App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login'
import Store from './pages/UserPage'
import Logout from './pages/Logout'
import StoreManagement from './pages/StoreManagement';

const App = () => {
  const [appUser, setAppUser] = React.useState(null);

  // logs out the [USER] or [ADMIN]
  const logout = (e) => {
    setAppUser(null);
}

  return (
    <div>
      <nav id="nav">
        {/* Navigation for user/admin not yet logged in */}
        {!appUser && <Link class="nav-link" to="/">Login</Link>}
        {!appUser && <Link class="nav-link" to="/store">Store</Link>}
        {!appUser && <Link class="nav-link" to="/storeManagement">Store Management</Link>}
        {/* Logout for user/admin logged in */}
        {appUser && <Link class="nav-link" to="/logout" onClick={logout}>Log Out</Link>}
        {/* Nav for ADMIN logged in */}
        {appUser === "Admin" && <Link class="nav-link" to="/store">Store</Link>}
        {appUser === "Admin" && <Link class="nav-link" to="/storeManagement">Store Management</Link>}
        {/* Nav for USER logged in */}
        {appUser === "User" && <Link class="nav-link" to="/store">Store</Link>}
        
      </nav>

      <Switch>
        <Route exact path="/" >
          <Login appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route exact path="/storeManagement">
          <StoreManagement appUser={appUser} />
        </Route>
        <Route exact path="/store">
          <Store appUser={appUser} />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
      </Switch>
    </div>
  );
};

export default App;