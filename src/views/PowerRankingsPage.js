import { functionsIn } from 'lodash';
import React, { useState } from 'react'
import GetFromAPI from '../components/GetFromAPI'
import LargeLogo from '../components/LargeLogo';
import SmallLogo from '../components/SmallLogo';
import { get_sheet_url, get_team_data } from '../utils/utils'

const sheet_id = "1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk";
const sheet_no = "8";

const key_mapping_powerrankings = [
  {
    key_head: "Team",
    key_init: "gsx$team",
    key_final: "team",
  },
  {
    key_head: "Ranking",
    key_init: "gsx$ranking",
    key_final: "ranking",
  },
]

const structure_powerrankings_raw_data = ({ raw, search }) => {
  var structured = {}, stru_ar = [];

  for (var row of raw) {
    row = key_mapping_powerrankings.reduce((acc, { key_init, key_final, key_head }) => ({ ...acc, [key_final]: row[key_init]?.$t }), {})
    stru_ar.push(row);
  }

  console.log(stru_ar);

  for (var row of stru_ar) {
    var { player, team, ranking } = row;
    var search_ar = [team, get_team_data(team).teamName, ranking];
    
    var check = search && search.trim().toLowerCase().split(' ').reduce((acc, word) => (acc | search_ar.reduce((eac, match = '') => eac | match.toLowerCase().replace(' ', '').includes(word), false)), false)
    if ((search && check) || (!search || search.length == 0)) {
        structured[team] = {ranking}
    }
  }

  for (var team in structured) {
    structured[team] = {
      ...structured[team],
      ...get_team_data(team)
    }
  }
  console.log({ structured });
  return structured
}

const EachTeamPowerRanking = ({ team_ob }) => {
  const { teamName, teamImg, ranking } = team_ob;
  return (
    <tr>
      <td><div className="col-flex align-flex-start"><SmallLogo image={teamImg} /> <span>{teamName}</span></div></td>
      <td>{ranking}</td>
    </tr>
  )
}

const PowerRankingsJSX = (props) => {
  // console.log('powerrankings jsx props=>', props);
  const { api_data } = props;
  const raw = api_data.feed.entry;
  console.log('powerrankings jsx raw=>', raw);

  const [search, set_search] = useState('');

  // const structured = {};
  const structured = structure_powerrankings_raw_data({ raw, search });
  // console.log('powerrankings jsx strucured=>', structured);


  return (
    <div className="">
      <div className="center">
        <input onChange={(e) => { set_search(e.target.value) }} type="text" value={search} placeholder="Search" />
      </div>
      {
        (structured && Object.keys(structured).length>0)?(
          <table>
          <tbody>
            <tr>
              <th>Team</th>
              <th>Rankings</th>
            </tr>
            {Object.keys(structured).map(team =>
              <EachTeamPowerRanking {...{ team_ob: structured[team] }} />
            )}
          </tbody>
        </table>
        ):(
          <div className="card">
            <div className="card-content">
              <h5 className="center">Nothing Found</h5>
            </div>
          </div>
        )
      }
    </div>
  )
}

function PowerRankingsPage() {
  console.log('injury page')
  return (
    <div>
      <h5 className="center">NBA Power Rankings</h5>
      <GetFromAPI api={get_sheet_url({ sheet_id, sheet_no })} >
        <PowerRankingsJSX />
      </GetFromAPI>
    </div>
  )
}

export default PowerRankingsPage
