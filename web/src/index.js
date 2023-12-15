import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Redirect, Route,Switch} from 'react-router-dom'


import {mainRoutes} from './routes'
ReactDOM.render(
<Router>
  <Switch>
  <Redirect path="/" exact={true} to="admin/home"/>
    <Route path="/admin" render={routeProps => <App {...routeProps}/>}></Route>
    {mainRoutes.map((route)=>{
      return <Route key={route.path} path={route.path} component={route.component} />
    })}
  </Switch>
</Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
