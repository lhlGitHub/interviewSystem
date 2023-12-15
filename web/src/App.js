import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { adminRoutes } from './routes';
import Frame from './components/Frame/index';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Frame>
        <Switch>
          {adminRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={(routeProps) => {
                  return <route.component {...routeProps} />;
                }}
              />
            );
          })}
        </Switch>
      </Frame>
    </div>
  );
}

export default App;
