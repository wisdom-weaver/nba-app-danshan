import { relativeTimeRounding } from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { store } from "..";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import { MatchupTab, structure_matchup_data } from "../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { both, higher_better, lower_better, SingleStat, TeamBar } from "../components/stats_cards_components/stats_cards_components";
import { get_all_team_stats_action, set_stats_at_key_action} from '../store/actions/teamStatsActions'

const OddsTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const oddsA = (statA && statA?.stats["odds"]) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const oddsB = (statB && statB?.stats["odds"]) || {};
  // console.log("odds", { oddsA, oddsB });
  const oddsPair_mapping = [
    // { head: "Team", key: "team" },
    // { head: "Rotation", key: "rotation" },
    // { head: "Time", key: "time" },
    { head: "Open", key: "open" },
    { head: "Consensus", key: "consensus" },
    { head: "BetMGM", key: "betmgm" },
    { head: "SportsBetting", key: "sportsbetting" },
    { head: "Wynn", key: "wynn" },
    { head: "WH", key: "wh" },
    { head: "DK", key: "dk" },
    { head: "Circa", key: "circa" },
  ];

  return (
    <div className="card-content">
      {oddsA && Object.keys(oddsA).length != 0 ? (
        <>
          <div className="row-flex align-">
            <div className="col-flex w-200px justify-flex-start">
              <LargeLogo image={teamA_Img} />
              <span className="bold center">{teamA}</span>
            </div>
            <h5 className="center">vs</h5>
            <div className="col-flex w-200px justify-flex-start">
              <LargeLogo image={teamB_Img} />
              <span className="bold center">{teamB}</span>
            </div>
          </div>
          <div className="spacing-20px"></div>
          <h5 className="center">Odds</h5>
          <div className="spacing-20px"></div>
          <div className="m-auto max_w-250px">
            {oddsPair_mapping.map(({ head, key }) => (
              <>
                <SingleStat
                  statLeft={head}
                  statRight={oddsA[key]}
                  lval={20}
                  rval={80}
                  // statTitle={head}
                  {...{ colorA, colorB }}
                />
                <div className="spacing-10px"></div>
              </>
            ))}
          </div>
        </>
      ) : (
        <h5 className="center">No Odds yet</h5>
      )}
    </div>
  );
};

const TrendsTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const trendsA = (statA && statA?.stats?.trends) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const trendsB = (statB && statB?.stats?.trends) || {};
  // console.log("trends", { trendsA, trendsB }, colorA, colorB);

  const trendsPair_mapping = [
    // { head: "Teams", key: "teams" },
    { head: "Win Loss", key: "win-loss" },
    { head: "Streak", key: "streak" },
    { head: "ATS", key: "ats" },
    { head: "Open", key: "open" },
    { head: "Side", key: "side" },
    { head: "Money", key: "money" },
    { head: "OU", key: "ou" },
  ];

  return (trendsA && Object.keys(trendsA).length != 0) ||
    (trendsB && Object.keys(trendsB).length != 0) ? (
    <div className="card-content">
      <TeamBar
        midTitle={"Trends"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      <div className="bottom-margin-30px"></div>
      <table className="hide-on-small-only">
        <tbody>
          <tr>
            <td>Teams</td>
            {trendsPair_mapping.map(({ head, key }) => (
              <td>{head}</td>
            ))}
          </tr>
          <tr>
            <td style={{ borderBottom: `3px solid ${colorA}` }}>
              {trendsA["teams"]}
            </td>
            {trendsPair_mapping.map(({ head, key }) => (
              <td>{trendsA[key]}</td>
            ))}
          </tr>
          <tr>
            <td style={{ borderBottom: `4px solid ${colorB}` }}>
              {trendsB["teams"]}
            </td>
            {trendsPair_mapping.map(({ head, key }) => (
              <td>{trendsB[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="hide-on-med-and-up">
        <tbody>
          {trendsPair_mapping.map(({ head, key }) => (
            <SingleStat
              statLeft={trendsA[key]}
              statRight={trendsB[key]}
              show_line={true}
              statTitle={head}
              {...{ colorA, colorB }}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="card-content">
      <p className="flow-text center">No Trends at the moment</p>
    </div>
  );
};

const InjuriesTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const injuriesA = (statA && statA?.stats?.injuries) || [];
  const { teamB, teamB_Img, colorB } = statB;
  const injuriesB = (statB && statB?.stats?.injuries) || [];
  // console.log({injuriesA, injuriesB})
  const key_mapping_injuries = [
    {
      key_head: "Team",
      key_init: "gsx$teamid",
      key_final: "team",
    },
    {
      key_head: "Team",
      key_init: "gsx$team",
      key_final: "teams",
    },
    {
      key_head: "Player",
      key_init: "gsx$player",
      key_final: "player",
    },
    {
      key_head: "Position",
      key_init: "gsx$position",
      key_final: "position",
    },
    {
      key_head: "Updated",
      key_init: "gsx$updated",
      key_final: "updated",
    },
    {
      key_head: "Injury",
      key_init: "gsx$injury",
      key_final: "injury",
    },
    {
      key_head: "Injury Status",
      key_init: "gsx$injurystatus",
      key_final: "injurystatus",
    },
    {
      key_head: "PositionNo",
      key_init: "gsx$positionno",
      key_final: "positionno",
    },
  ];
  return (
    <div className="card-content">
      <h5 className="center">Injuries</h5>
      {[
        { injuries: injuriesA, team_Img: teamA_Img, team: teamA },
        { injuries: injuriesB, team_Img: teamB_Img, team: teamB },
      ].map(({ injuries, team_Img, team }) => (
        <>
          <div className="row-flex flex-start">
            <LargeLogo image={team_Img} />
            <h5 className="bold center">{team}</h5>
          </div>
          <div className="spacing-10px"></div>

          {injuries && injuries.length != 0 ? (
            <>
              <div className="hide-on-small-only">
                <table>
                  <tbody>
                    <tr>
                      <th>Player</th>
                      <th>Position</th>
                      <th>Updated</th>
                      <th>Injury</th>
                      <th>Injury Status</th>
                    </tr>
                    {injuries?.map(
                      ({
                        player,
                        position,
                        updated,
                        injury,
                        injurystatus,
                        positionno,
                      }) => (
                        <>
                          <tr>
                            <th>{player}</th>
                            <td>
                              {position}/{positionno}
                            </td>
                            <td>{updated}</td>
                            <td>{injury}</td>
                            <td>{injurystatus}</td>
                          </tr>
                        </>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="hide-on-med-and-up">
                <table className="small-table">
                  <tbody>
                    <tr>
                      <th>Player</th>
                      <th>Position</th>
                      <th>Updated</th>
                      <th>Injury</th>
                    </tr>
                    {injuries?.map(
                      ({
                        player,
                        position,
                        updated,
                        injury,
                        injurystatus,
                        positionno,
                      }) => (
                        <>
                          <tr>
                            <th>{player}</th>
                            <td>
                              {position}/{positionno}
                            </td>
                            <td>{updated}</td>
                            <td>{injury}</td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              <span className="head">Status: </span>
                              {injurystatus}
                            </td>
                          </tr>
                        </>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h6 className="center head">No Injuries</h6>
          )}
        </>
      ))}
    </div>
  );
};

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

const keyPairs_trends = {
  team: "gsx$team",
  teams: "gsx$teams",
  "win-loss": "gsx$win-loss",
  streak: "gsx$streak",
  ats: "gsx$ats",
  open: "gsx$open",
  side: "gsx$side",
  money: "gsx$money",
  ou: "gsx$ou",
};

const keyPairs_odds = {
  team: "gsx$team",
  rotation: "gsx$rotation",
  time: "gsx$time",
  open: "gsx$open",
  consensus: "gsx$consensus",
  betmgm: "gsx$betmgm",
  sportsbetting: "gsx$sportsbetting",
  wynn: "gsx$wynn",
  wh: "gsx$wh",
  dk: "gsx$dk",
  circa: "gsx$circa",
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

// export const statsPostFetchFn = (data_ar) => {
//   // console.log("data_ar =>", data_ar);
//   // var raw = data_ar.reduce((acc, ea) => [...acc, ...ea?.feed?.entry], []);
//   var teams = data_ar[0].feed.entry.map(
//     (row) => row[keyPairs_primary["team"]]["$t"]
//   );
//   teams = Array.from(new Set(teams).add("76ers"))
//     .filter((ea) => ea != "")
//     .sort();
//   var structured = teams.reduce((acc, team) => ({ ...acc, [team]: {} }), {});
//   var matchup_raw = data_ar[0].feed.entry;
//   for (var row of matchup_raw) {
//     row = Object.entries(keyPairs_matchup).reduce(
//       (acc, [key_final, key_init]) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t || "",
//       }),
//       {}
//     );
//     var team = row.team;
//     if (team == "76ers" || team == "Seventysixers") team = "76ers";
//     if (teams.includes(team))
//       structured[team]["matchup"] = {
//         ...structured[team]["matchup"],
//         ...row,
//       };
//   }

//   var matchup_sag_raw = data_ar[1].feed.entry;
//   for (var row of matchup_sag_raw) {
//     row = Object.entries(keyPairs_matchup_sag).reduce(
//       (acc, [key_final, key_init]) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t || "",
//       }),
//       {}
//     );
//     var team = row.team;
//     if (team == "76ers" || team == "Seventysixers") team = "76ers";
//     if (teams.includes(team))
//       structured[team]["matchup"] = {
//         ...structured[team]["matchup"],
//         ...row,
//       };
//   }

//   var trends_raw = data_ar[2].feed.entry;
//   // console.log(trends_raw);
//   for (var row of trends_raw) {
//     row = Object.entries(keyPairs_trends).reduce(
//       (acc, [key_final, key_init]) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t || "",
//       }),
//       {}
//     );
//     var team = row.team;
//     if (team == "76ers" || team == "Seventysixers") team = "76ers";
//     // console.log('team', team)
//     if (teams.includes(team)) {
//       // console.log('row trends', team, row)
//       structured[team]["trends"] = {
//         ...structured[team]["trends"],
//         ...row,
//       };
//     }
//   }

//   var odds_raw = data_ar[3].feed.entry;
//   for (var row of odds_raw) {
//     row = Object.entries(keyPairs_odds).reduce(
//       (acc, [key_final, key_init]) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t || "",
//       }),
//       {}
//     );
//     var team = row.team;
//     if (team == "76ers" || team == "Seventysixers") team = "76ers";
//     if (teams.includes(team)) {
//       // console.log('row odds', team, row)
//       structured[team]["odds"] = {
//         ...structured[team]["odds"],
//         ...row,
//       };
//     }
//   }

//   var injuries_raw = data_ar[4].feed.entry;
//   // console.log({injuries_raw});
//   for (var row of injuries_raw) {
//     row = Object.entries(keyPairs_injuries).reduce(
//       (acc, [key_final, key_init]) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t || "",
//       }),
//       {}
//     );
//     var team = row.team;
//     if (team == "76ers" || team == "Seventysixers") team = "76ers";
//     if (teams.includes(team)) {
//       // console.log('row injuries', team, row)
//       structured[team]["injuries"] = [
//         ...((structured[team] && structured[team]["injuries"]) || []),
//         row,
//       ];
//     }
//   }

//   var streaks_raw = data_ar[5].feed.entry.map((row) =>
//     keyPairs_mapping_streaks.reduce(
//       (acc, { key_init, key_final }) => ({
//         ...acc,
//         [key_final]: row[key_init]?.$t,
//       }),
//       {}
//     )
//   );
//   // console.log({ streaks_raw });
//   var streaks = streaks_raw.reduce(
//     (acc, { game, streaks }) => ({
//       ...acc,
//       [game]: {
//         ...(acc[game] || {}),
//         streaks: [...((acc[game] && acc[game].streaks) || []), streaks],
//       },
//     }),
//     {}
//   );
//   // console.log({ streaks });
//   return { stats: structured, streaks };
// };

export const dispatch_structured_data = ({category, subcategory, structured_data})=>{
  var {stat_key, stat_structure} = structured_data;
  store.dispatch(set_stats_at_key_action({
    category, subcategory,
    stat_key, stat_structure
  }))
}

export const post_fetch_api_at_stat_key= ({data_ar, structure_data, category, subcategory}) => {
  return dispatch_structured_data({category, subcategory, structured_data:structure_data(data_ar) })
}

const get_team_stats = ({team, configs, category, subcategory, stats})=>{
  if(!stats) return {}
  var ar = Object.keys(configs).map(([key])=>(
    [[key], [stats[key][team]] || null]
  ))
  return Object.entries(ar);
}

function StatsTabsCard2(props) {
  console.log('StatsTabCard 2')
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
    }
  }
  const dispatch = useDispatch()
  console.log(teamA_mini)
  const stats = useSelector(store=>store.teamStats[category][subcategory].stats);
  if(!stats) return <><h1 className="center">Loading...</h1></>
  const statA = dispatch(get_all_team_stats_action({team: 'Clippers', category, subcategory, key:'matchup', }));
  console.log('statA', statA);
  return <>
    <h1 className="center">hello</h1>
  </>
}

export default StatsTabsCard2;
