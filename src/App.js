import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import InjuriesPage from './views/InjuriesPage';

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
