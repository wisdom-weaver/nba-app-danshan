import { relativeTimeRounding } from "moment";
import React, { Fragment } from "react";
import { Tabs, Tab } from "react-materialize";
import { useSelector } from "react-redux";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import { teamStatsReducer } from "../store/reducers/teamStatsReducer";

const BarLine = (props) => {
  const { left, right, colorA, colorB, side } = props;
  return (
    <div className="row-flex barline">
      <div
        style={{
          backgroundColor: colorA,
          width: `${left - 0.3}%`,
          opacity: side != -1 ? (side == 0 ? "1" : "0.2") : "1",
        }}
        className="bar-left mh-10px"
      ></div>
      <div
        style={{ backgroundColor: "white", width: `${0.6}%` }}
        className="bar-left mh-10px"
      ></div>
      <div
        style={{
          backgroundColor: colorB,
          width: `${right - 0.3}%`,
          opacity: side != -1 ? (side == 1 ? "1" : "0.2") : "1",
        }}
        className="bar-right mh-10px"
      ></div>
    </div>
  );
};

const TeamBar = ({ teamA, teamB, teamA_Img, teamB_Img, midTitle }) => {
  return (
    <div className="row-flex justify-space-between">
      <div className="col-flex">
        <LargeLogo image={teamA_Img} />
        <span className="bold center">{teamA}</span>
      </div>
      <h5 className="center">{midTitle}</h5>
      <div className="col-flex">
        <LargeLogo image={teamB_Img} />
        <span className="bold center">{teamB}</span>
      </div>
    </div>
  );
};

const SingleStat = ({
  statLeft,
  statRight,
  statTitle,
  barBottomText,
  colorA,
  colorB,
  side = -1,
  show_line = false,
  lval = 50,
  rval = 50,
}) => {
  const left = (lval * 100) / (lval + rval);
  const right = (rval * 100) / (lval + rval);
  return (
    <div className="SingleStatContainer w-100">
      <div className="row-flex justify-space-between">
        <span>{statLeft}</span>
        <span className="bold">{statTitle}</span>
        <span>{statRight}</span>
      </div>
      {show_line && <BarLine {...{ left, right, colorA, colorB, side }} />}
      {barBottomText && <p className="center grey-text">{barBottomText}</p>}
      {!barBottomText && <div className="spacing-5px"></div>}
    </div>
  );
};
const get_n = (n) => parseFloat(n.split(" ").reverse()[0]);
const higher_better = (a, b) => {
  a = get_n(a);
  b = get_n(b);
  return a > b ? 0 : 1;
};
const lower_better = (a, b) => {
  a = get_n(a);
  b = get_n(b);
  return b > a ? 0 : 1;
};
const both = (a, b) => -1;

const MatchupTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const matchA = (statA && statA?.stats?.matchup) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const matchB = (statB && statB?.stats?.matchup) || {};

  const ats_records = [
    {
      head: "Against The Spread",
      key: "ATS",
      side_eval: higher_better,
    },
    {
      head: "Straight Up",
      key: "SU",
      side_eval: higher_better,
    },
    {
      head: "O/U",
      key: "O/U",
      side_eval: both,
    },
    {
      head: "Average Line",
      key: "avg line",
      side_eval: lower_better,
    },
    {
      head: "Average Total",
      key: "avg total",
      side_eval: both,
    },
  ];

  const team_matchup = [
    {
      head: "Power Ranking",
      key: "points",
      side_eval: lower_better,
    },
    {
      head: "Sagarin Rating",
      key: "rating",
      side_eval: higher_better,
    },
    {
      head: "FG",
      key: "FG",
      side_eval: higher_better,
    },
    {
      head: "FG%",
      key: "FG%",
      side_eval: higher_better,
    },
    {
      head: "FT",
      key: "FT",
      side_eval: higher_better,
    },
    {
      head: "FT%",
      key: "FT%",
      side_eval: higher_better,
    },
    {
      head: "3s",
      key: "3s",
      side_eval: higher_better,
    },
    {
      head: "3s%",
      key: "3s%",
      side_eval: higher_better,
    },
    {
      head: "BLKS",
      key: "BLKS",
      side_eval: higher_better,
    },
    {
      head: "O-RBND",
      key: "O-RBND",
      side_eval: higher_better,
    },
    {
      head: "RBND",
      key: "RBND",
      side_eval: higher_better,
    },
    {
      head: "Fouls",
      key: "Fouls",
      side_eval: lower_better,
    },
    {
      head: "AST",
      key: "AST",
      side_eval: higher_better,
    },
    {
      head: "Turnovers",
      key: "Turnovers",
      side_eval: lower_better,
    },
    {
      head: "Q1",
      key: "Q1",
      side_eval: higher_better,
    },
    {
      head: "Q2",
      key: "Q2",
      side_eval: higher_better,
    },
    {
      head: "Q3",
      key: "Q3",
      side_eval: higher_better,
    },
    {
      head: "Q4",
      key: "Q4",
      side_eval: higher_better,
    },
    {
      head: "Avg Score",
      key: "Avg Score",
      side_eval: higher_better,
    },
    {
      head: "Opp FG",
      key: "Opp FG",
      side_eval: lower_better,
    },
    {
      head: "Opp FG%",
      key: "Opp FG%",
      side_eval: lower_better,
    },
    {
      head: "Opp FT",
      key: "Opp FT",
      side_eval: lower_better,
    },
    {
      head: "Opp FT%",
      key: "Opp FT%",
      side_eval: lower_better,
    },
    {
      head: "Opp 3s",
      key: "Opp 3s",
      side_eval: lower_better,
    },
    {
      head: "Opp 3s%",
      key: "Opp 3s%",
      side_eval: lower_better,
    },
    {
      head: "Opp BLKS",
      key: "Opp BLKS",
      side_eval: lower_better,
    },
    {
      head: "Opp O-RBND",
      key: "Opp O-RBND",
      side_eval: lower_better,
    },
    {
      head: "Opp RBND",
      key: "Opp RBND",
      side_eval: lower_better,
    },
    {
      head: "Opp Fouls",
      key: "Opp Fouls",
      side_eval: higher_better,
    },
    {
      head: "Opp AST",
      key: "Opp AST",
      side_eval: lower_better,
    },
    {
      head: "Opp Turnovers",
      key: "Opp Turnovers",
      side_eval: higher_better,
    },
    {
      head: "Opp Q1",
      key: "Opp Q1",
      side_eval: lower_better,
    },
    {
      head: "Opp Q2",
      key: "Opp Q2",
      side_eval: lower_better,
    },
    {
      head: "Opp Q3",
      key: "Opp Q3",
      side_eval: lower_better,
    },
    {
      head: "Opp Q4",
      key: "Opp Q4",
      side_eval: lower_better,
    },
    {
      head: "Opp Avg Score",
      key: "Opp Avg Score",
      side_eval: lower_better,
    },
  ];

  return (matchA && Object.keys(matchA).length != 0) ||
    (matchB && Object.keys(matchB).length != 0) ? (
    <div className="card-content">
      <TeamBar
        midTitle={"ATS Records"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      <div className="bottom-margin-30px"></div>
      {ats_records.map((stat_row) => (
        <>
          <div className="spacing-10px"></div>

          <SingleStat
            statLeft={matchA && matchA[stat_row.key]}
            statRight={matchB && matchB[stat_row.key]}
            side={
              stat_row.side_eval
                ? stat_row.side_eval(matchA[stat_row.key], matchB[stat_row.key])
                : -1
            }
            show_line={true}
            statTitle={stat_row.head}
            {...{ colorA, colorB }}
          />
        </>
      ))}

      <div className="bottom-margin-30px"></div>

      <TeamBar
        midTitle={"Team Matchup"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      {team_matchup.map((stat_row) => (
        <>
          <div className="spacing-10px"></div>

          <SingleStat
            statLeft={matchA && matchA[stat_row.key]}
            statRight={matchB && matchB[stat_row.key]}
            side={
              stat_row.side_eval
                ? stat_row.side_eval(matchA[stat_row.key], matchB[stat_row.key])
                : -1
            }
            show_line={true}
            statTitle={stat_row.head}
            {...{ colorA, colorB }}
          />
        </>
      ))}
    </div>
  ) : (
    <div className="card-content">
      <p className="flow-text center">No Data Fetched at the moment</p>
    </div>
  );
};

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

export const statsPostFetchFn = (data_ar) => {
  // console.log("data_ar =>", data_ar);
  // var raw = data_ar.reduce((acc, ea) => [...acc, ...ea?.feed?.entry], []);
  var teams = data_ar[0].feed.entry.map(
    (row) => row[keyPairs_primary["team"]]["$t"]
  );
  teams = Array.from(new Set(teams).add("76ers"))
    .filter((ea) => ea != "")
    .sort();
  var structured = teams.reduce((acc, team) => ({ ...acc, [team]: {} }), {});
  var matchup_raw = data_ar[0].feed.entry;
  for (var row of matchup_raw) {
    row = Object.entries(keyPairs_matchup).reduce(
      (acc, [key_final, key_init]) => ({
        ...acc,
        [key_final]: row[key_init]?.$t || "",
      }),
      {}
    );
    var team = row.team;
    if (team == "76ers" || team == "Seventysixers") team = "76ers";
    if (teams.includes(team))
      structured[team]["matchup"] = {
        ...structured[team]["matchup"],
        ...row,
      };
  }

  var matchup_sag_raw = data_ar[1].feed.entry;
  for (var row of matchup_sag_raw) {
    row = Object.entries(keyPairs_matchup_sag).reduce(
      (acc, [key_final, key_init]) => ({
        ...acc,
        [key_final]: row[key_init]?.$t || "",
      }),
      {}
    );
    var team = row.team;
    if (team == "76ers" || team == "Seventysixers") team = "76ers";
    if (teams.includes(team))
      structured[team]["matchup"] = {
        ...structured[team]["matchup"],
        ...row,
      };
  }

  var trends_raw = data_ar[2].feed.entry;
  // console.log(trends_raw);
  for (var row of trends_raw) {
    row = Object.entries(keyPairs_trends).reduce(
      (acc, [key_final, key_init]) => ({
        ...acc,
        [key_final]: row[key_init]?.$t || "",
      }),
      {}
    );
    var team = row.team;
    if (team == "76ers" || team == "Seventysixers") team = "76ers";
    // console.log('team', team)
    if (teams.includes(team)) {
      // console.log('row trends', team, row)
      structured[team]["trends"] = {
        ...structured[team]["trends"],
        ...row,
      };
    }
  }

  var odds_raw = data_ar[3].feed.entry;
  for (var row of odds_raw) {
    row = Object.entries(keyPairs_odds).reduce(
      (acc, [key_final, key_init]) => ({
        ...acc,
        [key_final]: row[key_init]?.$t || "",
      }),
      {}
    );
    var team = row.team;
    if (team == "76ers" || team == "Seventysixers") team = "76ers";
    if (teams.includes(team)) {
      // console.log('row odds', team, row)
      structured[team]["odds"] = {
        ...structured[team]["odds"],
        ...row,
      };
    }
  }

  var injuries_raw = data_ar[4].feed.entry;
  // console.log({injuries_raw});
  for (var row of injuries_raw) {
    row = Object.entries(keyPairs_injuries).reduce(
      (acc, [key_final, key_init]) => ({
        ...acc,
        [key_final]: row[key_init]?.$t || "",
      }),
      {}
    );
    var team = row.team;
    if (team == "76ers" || team == "Seventysixers") team = "76ers";
    if (teams.includes(team)) {
      // console.log('row injuries', team, row)
      structured[team]["injuries"] = [
        ...((structured[team] && structured[team]["injuries"]) || []),
        row,
      ];
    }
  }

  var streaks_raw = data_ar[5].feed.entry.map((row) =>
    keyPairs_mapping_streaks.reduce(
      (acc, { key_init, key_final }) => ({
        ...acc,
        [key_final]: row[key_init]?.$t,
      }),
      {}
    )
  );
  console.log({ streaks_raw });
  var streaks = streaks_raw.reduce(
    (acc, { game, streaks }) => ({
      ...acc,
      [game]: {
        ...(acc[game] || {}),
        streaks: [...((acc[game] && acc[game].streaks) || []), streaks],
      },
    }),
    {}
  );
  console.log({ streaks });
  return { stats: structured, streaks };
};

function StatsTabsCard(props) {
  const { category, subcategory, GameID, teamsData } = props;
  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
  );
  const { stats } = useSelector(({ teamStats }) => {
    try {
      return teamStats[category][subcategory];
    } catch (err) {
      return {};
    }
  });
  const statA = stats &&
    Object.keys(stats).includes(teamA_mini) && {
      stats: stats[teamA_mini],
      teamA_mini,
      teamA: teamsData.teamA,
      teamA_Img: teamsData.teamA_Img,
      colorA: teamsData.colorA,
    };
  const statB = stats &&
    Object.keys(stats).includes(teamB_mini) && {
      stats: stats[teamB_mini],
      teamB_mini,
      teamB: teamsData.teamB,
      teamB_Img: teamsData.teamB_Img,
      colorB: teamsData.colorB,
    };

  const game_mini = `${teamA_mini}@${teamB_mini}`;
  const { streaks } = useSelector(({ teamStats }) => {
    {
      try {
        return teamStats[category][subcategory]["streaks"][game_mini];
      } catch (err) {
        return {};
      }
    }
  });
  
  if (!stats) return <></>;
  return (
    (Object.keys(stats).includes(teamA_mini) ||
      Object.keys(stats).includes(teamB_mini)) && (
      <div className="col s12 ">
        <div className="card mb-0px p0 round-card">
          <Tabs id="StatTabs" className="stats-tabs z-depth-1">
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              active
              title="Matchup"
            >
              <MatchupTab {...{ statA, statB }} />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              // active
              title="Odds"
            >
              <OddsTab {...{ statA, statB }} />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              // active
              title="Trends"
            >
              <TrendsTab {...{ statA, statB }} />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              // active
              title="Injuries"
            >
              <InjuriesTab {...{ statA, statB }} />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              // active
              title="Streaks"
            >
              <StreaksTab {...{ statA, statB, streaks }} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  );
}

export default StatsTabsCard;
