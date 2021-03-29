import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import { TeamLink } from "../../../views/HomePage";
import LargeLogo from "../../LargeLogo";
import { structure_raw_row_from_key_mapping } from "../stats_cards_components";

const key_mapping_depthcharts = [
  { key_head: "Team", key_init: "gsx$team", key_final: "team" },
  { key_head: "Pos", key_init: "gsx$pos", key_final: "pos" },
  { key_head: "Starter", key_init: "gsx$starter", key_final: "starter" },
];

// const format_injuries_pos = (inp)=>{
//   let ar = [
//     {imp:'high', style:'red-text'},
//     {imp:'med',  style:'blue-text'},
//     {imp:'low',  style:'green-text'},
//     {imp:'na',   style:'black-text'},
//   ]
//   let evaluated = ar.find(({imp})=>inp.toLowerCase().includes(imp))
//   let classname = (evaluated && evaluated.style) ||  'black-text'
//   return <span className={classname}>{inp}</span>
// };

const category = "basketball";
const subcategory = "nba";

const stat_key = "depthcharts";

export const structure_depthcharts_data = (data_ar) => {
  var raw_depthcharts = data_ar[0].feed.entry;
  raw_depthcharts = structure_raw_row_from_key_mapping({
    raw: raw_depthcharts,
    key_mapping: key_mapping_depthcharts,
  });

  raw_depthcharts = raw_depthcharts.map((ea) => ({
    ...ea,
    team: get_team_key({ team: ea.team, category, subcategory }),
  }));
  var str_depthcharts = _.groupBy(raw_depthcharts, "team");
  // console.log({str_depthcharts})
  return { stat_structure: str_depthcharts, stat_key };
};

export const TeamDepthChartTab = ({
  team,
  category,
  subcategory,
  showTeam = true,
}) => {
  const { teamImg, color1 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  // const injuries = []
  const depthcharts = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats[stat_key][team];
    } catch (err) {
      return [];
    }
  });
  // console.log(team, depthcharts);
  return (
    <>
      <div
        className="card round-card"
        style={{ boxShadow: `0 0px 5px 0 ${color1}` }}
      >
        <div className="card-content">
          {showTeam && (
            <TeamLink {...{ team, size: "large", align: "center" }} />
          )}
          {!showTeam && <h5 className="center head">Depth Chart</h5>}
          <div className="spacing-10px"></div>
          {depthcharts && depthcharts.length > 0 ? (
            <div className="m0auto">
              <table style={{ maxWidth: 300 }} className="m0auto" >
                <tbody>
                  <tr>
                    <th className="left-align">Pos</th>
                    <th className="center">Starter</th>
                  </tr>
                  {depthcharts?.map(({ team, pos, starter }, index) => (
                    <React.Fragment key={index}>
                      {index < 5 && (
                        <tr>
                          <th className="left-align">{pos}</th>
                          <th>{starter}</th>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div style={{
                minHeight: 2,
                backgroundColor: color1
              }} ></div>
              <table style={{ maxWidth: 300 }} className="m0auto">
                <tbody>
                  {depthcharts?.map(({ team, pos, starter }, index) => (
                    <React.Fragment key={index}>
                      {index >= 5 && (
                        <tr>
                          <th className="left-align">{pos}</th>
                          <td>{starter}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h6 className="center head">No Depth Chart</h6>
          )}
        </div>
      </div>
    </>
  );
};
