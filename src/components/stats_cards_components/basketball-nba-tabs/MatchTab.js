import _ from 'lodash'
import {
  both,
  higher_better,
  lower_better,
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";

const key_mapping_matchup = [
  {
    key_head: "Team",
    key_init: "gsx$teams",
    key_final: "team",
    side_eval: null,
  },
  {
    key_head: "Against The Spread",
    key_init: "gsx$_d6ua4",
    key_final: "ATS",
    side_eval: higher_better,
  },
  {
    key_head: "Straight Up",
    key_init: "gsx$_d5fpr",
    key_final: "SU",
    side_eval: higher_better,
  },
  {
    key_head: "O/U",
    key_init: "gsx$_dkvya",
    key_final: "O/U",
    side_eval: both,
  },
  {
    key_head: "Average Line",
    key_init: "gsx$_d88ul",
    key_final: "avg_line",
    side_eval: lower_better,
  },
  {
    key_head: "Average Total",
    key_init: "gsx$_dmair",
    key_final: "avg_total",
    side_eval: both,
  },
  {
    key_head: "FG",
    key_init: "gsx$teams_2",
    key_final: "FG",
    side_eval: higher_better,
  },
  {
    key_head: "FG%",
    key_init: "gsx$_dp3nl",
    key_final: "FG%",
    side_eval: higher_better,
  },
  {
    key_head: "FT",
    key_init: "gsx$_df9om",
    key_final: "FT",
    side_eval: higher_better,
  },
  {
    key_head: "FT%",
    key_init: "gsx$_dgo93",
    key_final: "FT%",
    side_eval: higher_better,
  },
  {
    key_head: "3s",
    key_init: "gsx$_di2tg",
    key_final: "3s",
    side_eval: higher_better,
  },
  {
    key_head: "3s%",
    key_init: "gsx$_djhdx",
    key_final: "3s%",
    side_eval: higher_better,
  },
  {
    key_head: "BLKS",
    key_init: "gsx$_dw4je",
    key_final: "BLKS",
    side_eval: higher_better,
  },
  {
    key_head: "O-RBND",
    key_init: "gsx$_dxj3v",
    key_final: "O-RBND",
    side_eval: higher_better,
  },
  {
    key_head: "RBND",
    key_init: "gsx$_dyxo8",
    key_final: "RBND",
    side_eval: higher_better,
  },
  {
    key_head: "Fouls",
    key_init: "gsx$_e0c8p",
    key_final: "Fouls",
    side_eval: lower_better,
  },
  {
    key_head: "AST",
    key_init: "gsx$_dqi9q",
    key_final: "AST",
    side_eval: higher_better,
  },
  {
    key_head: "Turnovers",
    key_init: "gsx$_drwu7",
    key_final: "Turnovers",
    side_eval: lower_better,
  },
  {
    key_head: "Q1",
    key_init: "gsx$_dtbek",
    key_final: "Q1",
    side_eval: higher_better,
  },
  {
    key_head: "Q2",
    key_init: "gsx$_dupz1",
    key_final: "Q2",
    side_eval: higher_better,
  },
  {
    key_head: "Q3",
    key_init: "gsx$_e7d2q",
    key_final: "Q3",
    side_eval: higher_better,
  },
  {
    key_head: "Q4",
    key_init: "gsx$_e8rn7",
    key_final: "Q4",
    side_eval: higher_better,
  },
  {
    key_head: "Avg Score",
    key_init: "gsx$_ea67k",
    key_final: "Avg_Score",
    side_eval: higher_better,
  },
  {
    key_head: "Opp FG",
    key_init: "gsx$opps",
    key_final: "Opp FG",
    side_eval: lower_better,
  },
  {
    key_head: "Opp FG%",
    key_init: "gsx$_e1qt2",
    key_final: "Opp FG%",
    side_eval: lower_better,
  },
  {
    key_head: "Opp FT",
    key_init: "gsx$_e35dj",
    key_final: "Opp FT",
    side_eval: lower_better,
  },
  {
    key_head: "Opp FT%",
    key_init: "gsx$_e4jxw",
    key_final: "Opp FT%",
    side_eval: lower_better,
  },
  {
    key_head: "Opp 3s",
    key_init: "gsx$_e5yid",
    key_final: "Opp 3s",
    side_eval: lower_better,
  },
  {
    key_head: "Opp 3s%",
    key_init: "gsx$_eilm2",
    key_final: "Opp 3s%",
    side_eval: lower_better,
  },
  {
    key_head: "Opp BLKS",
    key_init: "gsx$_ek06j",
    key_final: "Opp BLKS",
    side_eval: lower_better,
  },
  {
    key_head: "Opp O-RBND",
    key_init: "gsx$_eleqw",
    key_final: "Opp O-RBND",
    side_eval: lower_better,
  },
  {
    key_head: "Opp RBND",
    key_init: "gsx$_emtbd",
    key_final: "Opp RBND",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Fouls",
    key_init: "gsx$_eczce",
    key_final: "Opp Fouls",
    side_eval: higher_better,
  },
  {
    key_head: "Opp AST",
    key_init: "gsx$_eedwv",
    key_final: "Opp AST",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Turnovers",
    key_init: "gsx$_efsh8",
    key_final: "Opp Turnovers",
    side_eval: higher_better,
  },
  {
    key_head: "Opp Q1",
    key_init: "gsx$_eh71p",
    key_final: "Opp Q1",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Q2",
    key_init: "gsx$_etu5e",
    key_final: "Opp Q2",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Q3",
    key_init: "gsx$_ev8pv",
    key_final: "Opp Q3",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Q4",
    key_init: "gsx$_ewna8",
    key_final: "Opp Q4",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Avg Score",
    key_init: "gsx$_ey1up",
    key_final: "Opp Avg Score",
    side_eval: lower_better,
  },
];

const key_mapping_matchup_sag = [
  {
    key_head: "Team",
    key_init: "gsx$teams",
    key_final: "team",
    side_eval: null,
  },
  {
    key_head: "Power Ranking",
    key_init: "gsx$points",
    key_final: "points",
    side_eval: lower_better,
  },
  {
    key_head: "Sagarin Rating",
    key_init: "gsx$rating",
    key_final: "rating",
    side_eval: higher_better,
  },
];

export const structure_matchup_data = (data_ar) => {
  var raw_matchup = data_ar[0].feed.entry;
  var raw_matchup_sag = data_ar[1].feed.entry;
  raw_matchup = structure_raw_row_from_key_mapping({raw: raw_matchup, key_mapping: key_mapping_matchup});
  raw_matchup_sag = structure_raw_row_from_key_mapping({raw: raw_matchup_sag, key_mapping: key_mapping_matchup_sag});
  // console.log("raw_matchup=>", raw_matchup);
  
  var str_matchup =  _.keyBy(
    _.merge(_.keyBy(raw_matchup, 'team'), _.keyBy(raw_matchup_sag, 'team'), ),
    'team');
  delete str_matchup[''];
  // console.log("str_matchup=>", str_matchup);  
  return { stat_structure: str_matchup, stat_key: 'matchup' };
};

export const MatchupTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const matchA = (statA && statA?.stats?.matchup) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const matchB = (statB && statB?.stats?.matchup) || {};
  // console.log('matchup tab', matchA, matchB)
  const ats_records = key_mapping_matchup.slice(1, 6);
  const team_matchup = [
    ...key_mapping_matchup_sag.slice(1),
    ...key_mapping_matchup.slice(6),
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
            statLeft={matchA && matchA[stat_row.key_final]}
            statRight={matchB && matchB[stat_row.key_final]}
            side={
              stat_row.side_eval
                ? stat_row.side_eval(matchA[stat_row.key_final], matchB[stat_row.key_final])
                : -1
            }
            show_line={true}
            statTitle={stat_row.key_head}
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
            statLeft={matchA && matchA[stat_row.key_final]}
            statRight={matchB && matchB[stat_row.key_final]}
            side={
              stat_row.side_eval
                ? stat_row.side_eval(matchA[stat_row.key_final], matchB[stat_row.key_final])
                : -1
            }
            show_line={true}
            statTitle={stat_row.key_head}
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
