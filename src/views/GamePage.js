import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data } from "../utils/utils";
// import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import StatsTabsCard2, { post_fetch_api_at_stat_key } from "./StatsTabsCard2";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";
import { structure_matchup_data } from "../components/stats_cards_components/basketball-nba-tabs/MatchTab";

function GamePage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { gameid } = match.params;
  const category = "basketball";
  const subcategory = "nba";
  const GameID = gameid.replaceAll("_", " ");

  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
  );

  const teamAData = get_team_data(teamA_mini);
  const teamBData = get_team_data(teamB_mini);
  const teamsData = {
    teamA: teamAData.teamName,
    teamA_Img: teamAData.teamImg,
    colorA: teamAData.color1,
    teamB: teamBData.teamName,
    colorB: teamBData.color1,
    teamB_Img: teamBData.teamImg,
  };

  // const { apis } = useSelector(
  //   ({ teamStats }) => teamStats[category][subcategory]
  // );

  return (
    <div className="container">
      <StatsCardWrapper
        // {...Object.fromEntries(apis)}
        {...{
          configs: {
            matchup: {
              apis: [
                // match_api,
                "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json",
                // sag_api
                "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json",
              ],
              structure_data: structure_matchup_data,
            },
          },
        }}
        {...{ category, subcategory, post_fetch_api_at_stat_key }}
      >
        <StatsTabsCard2 {...{ category, subcategory, GameID, teamsData }} />
      </StatsCardWrapper>
    </div>
  );
}

export default GamePage;
