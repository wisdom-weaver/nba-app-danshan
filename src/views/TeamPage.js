import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data_from_any_name } from "../utils/utils";
import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";

const category = "basketball";
const subcategory = "nba";

function TeamPage(props) {
  const match = useRouteMatch();
  const { teamid } = match.params;
  const teamData = get_team_data_from_any_name(teamid);
  console.log(teamData);
  return (
    <div className="container">
      <div className="team-top-section">
        
      </div>
    </div>
  );
}

export default TeamPage;
