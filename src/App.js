import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import InjuriesPage from './views/InjuriesPage';
import PowerRankingsPage from './views/PowerRankingsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Layout>
              <InjuriesPage />
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
          <Route exact path="/trends">
            <Layout>
              
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
