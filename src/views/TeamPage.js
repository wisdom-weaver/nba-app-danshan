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
        <div className="center">
          <LargeLogo image={teamData.teamImg} />
        </div>
        <h4 className="center m0">{teamData.teamName}</h4>

        <StatsCardWrapper
          match_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json"
          }
          sag_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json"
          }
          trends_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/5/public/values?alt=json"
          }
          odds_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/3/public/values?alt=json"
          }
          injuries_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/7/public/values?alt=json"
          }
          streaks_api={
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/9/public/values?alt=json"
          }
          {...{ category, subcategory }}
          postFetchFn={statsPostFetchFn}
          pushFetchToRedux={(data) => {
            console.log('pushFetchToRedux', data)
            dispatch(
              updateTeamStatsAction({
                category,
                subcategory,
                stats: data.stats,
              })
            );
            dispatch(
              updateGameStreaksAction({
                category,
                subcategory,
                streaks: data.streaks,
              })
            );
          }}
        >
          <StatsTabsCard {...{ category, subcategory, GameID, teamsData }} />
        </StatsCardWrapper>
      </div>
    </div>
  );
}

export default TeamPage;
