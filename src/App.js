import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import InjuriesPage from './views/InjuriesPage';
import PowerRankingsPage from './views/PowerRankingsPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Layout>
            </Layout>
          </Route>
          <Route exact path="/injuries">
            <Layout>
              <InjuriesPage />
            </Layout>
          </Route>
          <Route exact path="/powerrankings">
            <Layout>
              <PowerRankingsPage />
            </Layout>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
