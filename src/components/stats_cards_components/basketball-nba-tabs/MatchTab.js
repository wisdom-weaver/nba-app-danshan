import _ from "lodash";
import { useSelector } from "react-redux";
import {
  get_all_teams_names,
  get_n_with_sign,
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import {
  both,
  higher_better,
  lower_better,
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";
import { TeamLink } from "../../../views/HomePage";
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
    key_init: "gsx$team",
    key_final: "team",
    side_eval: null,
  },
  {
    key_head: "Power Ranking",
    key_init: "gsx$ranking",
    key_final: "ranking",
    side_eval: lower_better,
  },
  {
    key_head: "Sagarin Rating",
    key_init: "gsx$rating",
    key_final: "rating",
    side_eval: higher_better,
  },
];

const key_mapping_md = [
  {
    key_init: "gsx$_chk2m",
    key_head: "Team",
    key_final: "team_md",
  },
  {
    key_init: "gsx$_ciyn3",
    key_head: "OPP",
    key_final: "opp",
  },
  {
    key_init: "gsx$_ckd7g",
    key_head: "Site",
    key_final: "site",
  },
  {
    key_init: "gsx$_clrrx",
    key_head: "Final",
    key_final: "final",
  },
  {
    key_init: "gsx$_cyevm",
    key_head: "Line",
    key_final: "line",
  },
  {
    key_init: "gsx$_cztg3",
    key_head: "Total",
    key_final: "total",
  },
  {
    key_init: "gsx$_cre1l",
    key_head: "Date",
    key_final: "date",
  },
];

const format_md = {
  team_md: ({row}) => {
    return row['team_md'];
  },
  opp: ({row}) => {
    return row['opp'];
  },
  site: ({row}) => {
    var {site} = row;
    var lsite = site.toLowerCase();
    const classname =  (lsite=='home' && 'blue-text') || (lsite=='away' && 'purple-text') || ''
    return <span className={classname}>{site}</span>;
  },
  final: ({row}) => {
    const {final} = row;
    const [a,b] = final.split('-');
    const classname =  (a>b && 'green-text') || (b>a && 'red-text') || ''
    return <span className={classname}>{final}</span>;
  },
  line: ({row}) => {
    const {final, line} = row;
    let [a,b] = final.split('-');
    a = parseFloat(a)+parseFloat(line)
    const classname =  (a>b && 'green-text') || (b>a && 'red-text') || ''
    return <span className={classname}>{line}</span>;
  },
  total: ({row}) => {
    let {final, total} = row;
    total = parseFloat(total);
    const [a,b] = final.split('-');
    const fin_tot = parseFloat(a)+parseFloat(b)
    const classname =  (fin_tot>total ? 'green-text' : 'red-text')
    return <span className={classname}>{total}</span>;
  },
  date: ({row}) => {
    return row['date'];
  },
};

const category = "basketball",
  subcategory = "nba";

export const structure_matchup_data = (data_ar) => {
  try {
    var raw_matchup = data_ar && data_ar[0]?.feed.entry;
    var raw_matchup_md = data_ar && data_ar[0]?.feed.entry;
    // console.log("raw_matchup", raw_matchup);
    var raw_matchup_sag = data_ar[1].feed.entry;
    // console.log("raw_matchup_sag", raw_matchup_sag);

    raw_matchup = structure_raw_row_from_key_mapping({
      raw: raw_matchup,
      key_mapping: key_mapping_matchup,
    });
    raw_matchup = raw_matchup.map((ea) => ({
      ...ea,
      team: get_team_key({ team: ea.team, category, subcategory }),
    }));
    raw_matchup_sag = structure_raw_row_from_key_mapping({
      raw: raw_matchup_sag,
      key_mapping: key_mapping_matchup_sag,
    });
    raw_matchup_sag = raw_matchup_sag.map((ea) => ({
      ...ea,
      team: get_team_key({ team: ea.team, category, subcategory }),
      rating: get_n_with_sign(ea.rating),
      ranking: get_n_with_sign(ea.ranking),
    }));

    // console.log("raw_matchup=>", raw_matchup);

    // console.log("raw_matchup_md", raw_matchup_md);
    raw_matchup_md = structure_raw_row_from_key_mapping({
      raw: raw_matchup_md,
      key_mapping: key_mapping_md,
    });
    raw_matchup_md = raw_matchup_md.map((ea) => ({
      ...ea,
      team: get_team_key({ team: ea.team_md, category, subcategory }),
    }));
    raw_matchup_md = _.groupBy(raw_matchup_md, "team");
    raw_matchup_md = Object.entries(raw_matchup_md);
    raw_matchup_md = raw_matchup_md.map(([key, ob]) => [key, { md: ob }]);
    raw_matchup_md = Object.fromEntries(raw_matchup_md);

    // console.log('raw_matchup_md', raw_matchup_md);

    var str_matchup = _.keyBy(
      _.merge(_.keyBy(raw_matchup, "team"), _.keyBy(raw_matchup_sag, "team")),
      "team"
    );

    var final_str_matchup = get_all_teams_names({ category, subcategory });
    final_str_matchup = final_str_matchup.map((team) => [
      team,
      { ...str_matchup[team], ...raw_matchup_md[team] },
    ]);
    final_str_matchup = Object.fromEntries(final_str_matchup);

    delete final_str_matchup[""];
    delete final_str_matchup["Team"];

    // console.log("str_matchup=>", str_matchup);
    // console.log('final_str_matchup', final_str_matchup)
    return { stat_structure: final_str_matchup, stat_key: "matchup" };
  } catch (err) {
    return { stat_structure: {}, stat_key: "matchup" };
  }
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
                ? stat_row.side_eval(
                    matchA[stat_row.key_final],
                    matchB[stat_row.key_final]
                  )
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
                ? stat_row.side_eval(
                    matchA[stat_row.key_final],
                    matchB[stat_row.key_final]
                  )
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

export const TeamMatchup = ({ team, category, subcategory }) => {
  const { teamImg, color1, color2 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  const match = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["matchup"][team];
    } catch (err) {
      return [];
    }
  });

  const ats_records = key_mapping_matchup.slice(1, 6);
  const team_matchup = [
    ...key_mapping_matchup_sag.slice(1),
    ...key_mapping_matchup.slice(6),
  ];

  const q_heads = ["Q1", "Q2", "Q3", "Q4"];
  const opp_q_head = ["Opp Q1", "Opp Q2", "Opp Q3", "Opp Q4"];
  const odds_heads = [
    "FG",
    "FG%",
    "FT",
    "FT%",
    "3s",
    "3s%",
    "BLKS",
    "O-RBND",
    "RBND",
    "Fouls",
    "AST",
    "Turnovers",
    "Avg Score",
  ];
  const opp_odds_heads = [
    "Opp FG",
    "Opp FG%",
    "Opp FT",
    "Opp FT%",
    "Opp 3s",
    "Opp 3s%",
    "Opp BLKS",
    "Opp O-RBND",
    "Opp RBND",
    "Opp Fouls",
    "Opp AST",
    "Opp Turnovers",
    "Opp Avg Score",
  ];

  return (
    <div
      className="card round-card"
      style={{ boxShadow: `0 0px 5px 0 ${color1}` }}
    >
      <div className="card-content">
        {match && Object.keys(match).length != 0 ? (
          <>
            <div className="row-flex justify-space-around">
              {/* <TeamLink {...{team, size:'large',}}/> */}
              <h5 className="head">ATS Record</h5>
            </div>
            <div className="spacing-20px"></div>
            <div className="row">
              {ats_records.map((stat_row) => (
                <>
                  <div className="col s12 m6">
                    <StatPair {...{ match, stat_row }} />
                  </div>
                </>
              ))}
            </div>
            <hr />
            <div className="bottom-margin-30px"></div>
            <div className="row-flex justify-space-around">
              {/* <TeamLink {...{team, size:'large',}}/> */}
              <h5 className="head">Team Matchup</h5>
            </div>
            <div className="spacing-20px"></div>
            <div className="row mb-5px">
              <div className="col s6">
                <div className="row mb-0px">
                  <StatPairCollection heads_ar={q_heads} {...{ match }} />
                </div>
              </div>
              <div className="col s6">
                <div className="row mb-0px">
                  <StatPairCollection heads_ar={opp_q_head} {...{ match }} />
                </div>
              </div>
            </div>
            {/* <div className="row mb-5px ">
              <div className="col s12 m6">
                <StatPair {...{ match, stat_row: _.find(key_mapping_matchup_sag, { key_head: 'Power Ranking' }) }} />
              </div>
              <div className="col s12 m6">
                <StatPair {...{ match, stat_row: _.find(key_mapping_matchup_sag, { key_head: 'Sagarin Rating' }) }} />
              </div>
            </div> */}
            <div className="row mb-0px">
              <div className="col s6">
                <div className="row">
                  <StatPairCollection heads_ar={odds_heads} {...{ match }} />
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <StatPairCollection
                    heads_ar={opp_odds_heads}
                    {...{ match }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="flow-text center">No Data Fetched at the moment</p>
        )}
      </div>
    </div>
  );
};

export const TeamMatchupMD = ({ team, category, subcategory }) => {
  const { teamImg, color1, color2 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  const md = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["matchup"][team].md;
    } catch (err) {
      return [];
    }
  });
  const disp_mapping = get_ar_from_key_heads_md([
    "OPP",
    "Site",
    "Final",
    "Line",
    "Total",
    "Date",
  ]);
  return (
    <div
      className="card round-card"
      style={{ boxShadow: `0 0px 5px 0 ${color1}` }}
    >
      <div className="card-content">
        <h5 className="center head">Latest Games</h5>
        {md && md.length != 0 ? (
          <table>
            <tbody>
              <tr>
                {disp_mapping?.map(({ key_head }, index) => (
                  <th key={index}>{key_head}</th>
                ))}
              </tr>
              {md.map((eamd) => (
                <tr>
                  {disp_mapping?.map(({ key_final }, index) => (
                    <td key={index}>{
                      format_md[key_final]({ row:eamd })
                    }</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="flow-text center">No Data Fetched at the moment</p>
        )}
      </div>
    </div>
  );
};

const get_ar_from_key_heads = (head_ar) => {
  const mapping = key_mapping_matchup.concat(key_mapping_matchup_sag);
  return head_ar.map((head) => _.find(mapping, { key_head: head }));
};
const get_ar_from_key_heads_md = (head_ar) => {
  const mapping = key_mapping_md.concat(key_mapping_matchup_sag);
  return head_ar.map((head) => _.find(mapping, { key_head: head }));
};

const StatPair = ({ stat_row, match }) => {
  return (
    <>
      <div
        style={{ paddingLeft: "25px", paddingRight: "25px" }}
        className="row-flex justify-space-between"
      >
        <span className="head">{stat_row?.key_head}</span>
        <span>{match[stat_row?.key_final]}</span>
      </div>
      <div className="spacing-20px"></div>
    </>
  );
};

const StatPairCollection = ({ heads_ar, match }) => {
  return (
    <>
      {get_ar_from_key_heads(heads_ar).map((stat_row, ind) => (
        <div className="col s12 l6">
          {" "}
          <StatPair {...{ match, stat_row }} />{" "}
        </div>
      ))}
    </>
  );
};
