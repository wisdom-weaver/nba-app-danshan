import { relativeTimeRounding } from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { store } from "..";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import {
  MatchupTab,
  structure_matchup_data,
} from "../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { InjuriesTab } from "../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import { OddsTab } from "../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import {
  both,
  higher_better,
  lower_better,
  SingleStat,
  TeamBar,
} from "../components/stats_cards_components/stats_cards_components";
import {
  get_all_team_stats_action,
  set_stats_at_key_action,
} from "../store/actions/teamStatsActions";
import { get_colors_combo, get_team_data } from "../utils/utils";
import { TrendsTab } from "../components/stats_cards_components/basketball-nba-tabs/TrendsTab";

const StreaksTab = ({ statA, statB, streaks }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const { teamB, teamB_Img, colorB } = statB;
  return (
    <div className="card-content streaks-tab">
      <TeamBar
        midTitle={"Streaks"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      {streaks && streaks.length > 0 ? (
        streaks.map((streak) => (
          <>
            <div className="spacing-20px"></div>
            <p>{streak}</p>
            <div className="spacing-5px"></div>
            <hr />
          </>
        ))
      ) : (
        <h5 className="center head">No Streaks</h5>
      )}
    </div>
  );
};

const keyPairs_primary = {
  team: "gsx$teams",
};

const keyPairs_matchup = {
  team: "gsx$teams",
  SU: "gsx$_d5fpr",
  ATS: "gsx$_d6ua4",
  "avg line": "gsx$_d88ul",
  "O/U": "gsx$_dkvya",
  "avg total": "gsx$_dmair",
  FG: "gsx$teams_2",
  "FG%": "gsx$_dp3nl",
  FT: "gsx$_df9om",
  "FT%": "gsx$_dgo93",
  "3s": "gsx$_di2tg",
  "3s%": "gsx$_djhdx",
  BLKS: "gsx$_dw4je",
  "O-RBND": "gsx$_dxj3v",
  RBND: "gsx$_dyxo8",
  Fouls: "gsx$_e0c8p",
  AST: "gsx$_dqi9q",
  Turnovers: "gsx$_drwu7",
  Q1: "gsx$_dtbek",
  Q2: "gsx$_dupz1",
  Q3: "gsx$_e7d2q",
  Q4: "gsx$_e8rn7",
  "Avg Score": "gsx$_ea67k",
  "Opp FG": "gsx$opps",
  "Opp FG%": "gsx$_e1qt2",
  "Opp FT": "gsx$_e35dj",
  "Opp FT%": "gsx$_e4jxw",
  "Opp 3s": "gsx$_e5yid",
  "Opp 3s%": "gsx$_eilm2",
  "Opp BLKS": "gsx$_ek06j",
  "Opp O-RBND": "gsx$_eleqw",
  "Opp RBND": "gsx$_emtbd",
  "Opp Fouls": "gsx$_eczce",
  "Opp AST": "gsx$_eedwv",
  "Opp Turnovers": "gsx$_efsh8",
  "Opp Q1": "gsx$_eh71p",
  "Opp Q2": "gsx$_etu5e",
  "Opp Q3": "gsx$_ev8pv",
  "Opp Q4": "gsx$_ewna8",
  "Opp Avg Score": "gsx$_ey1up",
};

const keyPairs_matchup_sag = {
  team: "gsx$teams",
  rating: "gsx$rating",
  points: "gsx$points",
};

const keyPairs_injuries = {
  team: "gsx$teamid",
  teams: "gsx$team",
  player: "gsx$player",
  position: "gsx$position",
  updated: "gsx$updated",
  injury: "gsx$injury",
  injurystatus: "gsx$injurystatus",
  positionno: "gsx$positionno",
};

const keyPairs_mapping_streaks = [
  { key_init: "gsx$game", key_final: "game", key_head: "Game" },
  { key_init: "gsx$streaks", key_final: "streaks", key_head: "Streaks" },
];

export const dispatch_structured_data = ({
  category,
  subcategory,
  structured_data,
}) => {
  var { stat_key, stat_structure } = structured_data;
  store.dispatch(
    set_stats_at_key_action({
      category,
      subcategory,
      stat_key,
      stat_structure,
    })
  );
};

export const post_fetch_api_at_stat_key = ({
  data_ar,
  structure_data,
  category,
  subcategory,
}) => {
  return dispatch_structured_data({
    category,
    subcategory,
    structured_data: structure_data(data_ar),
  });
};

const get_team_stats = ({ team, configs, category, subcategory, stats }) => {
  if (!stats) return {};
  var ar = Object.keys(configs).map(([key]) => [
    [key],
    [stats[key][team]] || null,
  ]);
  return Object.entries(ar);
};

function StatsTabsCard2(props) {
  console.log("StatsTabCard 2");
  const dispatch = useDispatch();

  const { category, subcategory, GameID, teamsData } = props;
  // console.log(category, subcategory, GameID)
  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
  );
  const configs = {
    matchup: {
      apis: [
        // match_api,
        "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json",
        // sag_api
        "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json",
      ],
      structure_data: structure_matchup_data,
    },
  };
  const stats = useSelector(
    (store) => store.teamStats[category][subcategory].stats
  );
  if (!stats)
    return (
      <>
        <h1 className="center">Loading...</h1>
      </>
    );

  const team_dataA = get_team_data(teamA_mini);
  const team_dataB = get_team_data(teamB_mini);
  const keys = ["matchup", "injuries", "odds", "trends"];

  const { colorA, colorB } = get_colors_combo({
    colorsA: [team_dataA.color1, team_dataA.color2],
    colorsB: [team_dataB.color1, team_dataB.color2],
  });

  const statA = {
    teamA: team_dataA.teamName,
    teamA_Img: team_dataA.teamImg,
    colorA,
    stats: dispatch(
      get_all_team_stats_action({
        team: teamA_mini,
        category,
        subcategory,
        keys,
      })
    ),
  };
  const statB = {
    teamB: team_dataB.teamName,
    teamB_Img: team_dataB.teamImg,
    colorB,
    stats: dispatch(
      get_all_team_stats_action({
        team: teamB_mini,
        category,
        subcategory,
        keys,
      })
    ),
  };

  console.log("stats", { statA, statB });
  return (
    <>
      <div className="card round-card">
        <div className="card-content">
          {statA &&
            statB &&
            statA?.stats["matchup"] &&
            statB?.stats["matchup"] && <MatchupTab {...{ statA, statB }} />}
        </div>
      </div>
      <div className="card round-card">
        <div className="card-content">
          {/* {statA && statB && statA?.stats['injuries'] && statB?.stats['injuries'] && <InjuriesTab {...{statA, statB}} />} */}
        </div>
      </div>
      <div className="card round-card">
        <div className="card-content">
          {statA && statB && statA?.stats["odds"] && statB?.stats["odds"] && (
            <OddsTab {...{ statA, statB }} />
          )}
        </div>
      </div>
      <div className="card round-card">
        <div className="card-content">
          {statA && statB && statA?.stats["trends"] && statB?.stats["trends"] && (
            <TrendsTab {...{ statA, statB }} />
          )}
        </div>
      </div>
    </>
  );
}

export default StatsTabsCard2;
