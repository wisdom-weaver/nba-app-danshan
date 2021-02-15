import React from "react";
import { connect, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { compose } from "redux";
import Layout from "./components/Layout";
import { get_team_key } from "./utils/utils";
import GamePage from "./views/GamePage";
import InjuriesPage from "./views/InjuriesPage";
import PowerRankingsPage from "./views/PowerRankingsPage";
import TeamPage from "./views/TeamPage";

function App() {
  console.log(get_team_key({ team:'Hawks', category:'basketball', subcategory:'nba' }));
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Layout></Layout>
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
          <Route exact path="/team/:teamid">
            <TeamPage />
          </Route>
          <Route exact path="/game/:gameid">
            <GamePage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = (state)=>{
  console.log('state=>', state);
  return {}
}

const mapDispatchToProps = (dispatch)=>{
  return {}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(App);
