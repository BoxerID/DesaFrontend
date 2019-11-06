import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DefaultRoute from './DefaultRoute';
import PageLogin from './page/login';
import PageNotFound from './page/notfound'
import PageProfile from './page/profile/profile';
import PageDashboard from './page/dashboard/dashboard';
import PageUserList from './page/user/list';

import LoginModal from './page/loginmodal'
import { StoreProvider } from './store/store';
import { Empty } from 'antd';

const CheckLogin = () => {
  const token = localStorage.getItem('token');
  if (token === null || token === "") {
    return <Redirect to="/login" />
  }
  return <Redirect to="/dashboard" />
}

const NotFound = () => {
  return <div style={{ marginTop: 100 }}>
    <Empty description={"Halaman tidak ditemukan"} />
  </div>
}

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={CheckLogin} />
            <Route exact path="/login" component={PageLogin} />
            <Route exact path="/notfound" component={PageNotFound} />
            <DefaultRoute path="/dashboard" component={PageDashboard} exact />
            <DefaultRoute path="/profile" component={PageProfile} exact />
            <DefaultRoute path="/user" component={PageUserList} exact />
            <DefaultRoute path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
        <LoginModal />
      </StoreProvider>
    );
  }
}

export default App;



