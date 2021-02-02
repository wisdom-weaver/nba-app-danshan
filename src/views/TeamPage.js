import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data } from "../utils/utils";
import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";

function TeamPage(props) {
  const match = useRouteMatch();
  const { teamid } = match.params;
  const teamData = get_team_data(teamid);
  const category = "basketball";
  const subcategory = "nba";
  const GameID = "Clippers@Knicks";
  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
    );
    const teamAData = get_team_data(teamA_mini);
    const teamBData = get_team_data(teamB_mini);
    const dispatch = useDispatch();
    const teamsData = {
      teamA: teamAData.teamName,
      teamA_Img: teamAData.teamImg,
      colorA: teamAData.color1,
      teamB: teamBData.teamName,
      colorB: teamBData.color1,
      teamB_Img: teamBData.teamImg,
    }
    console.log({ teamsData });
  return (
    <div className="container">
      <div className="team-top-section">
        
      </div>
    </div>
  );
}

export default TeamPage;
