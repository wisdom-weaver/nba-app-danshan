import { functionsIn } from 'lodash';
import React, { useState } from 'react'
import GetFromAPI from '../components/GetFromAPI'
import LargeLogo from '../components/LargeLogo';
import SmallLogo from '../components/SmallLogo';
import { get_sheet_url, get_team_data } from '../utils/utils'

const sheet_id = "1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk";
const sheet_no = "7";

const injuries_key_mapping = [
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
]

const structure_injuries_raw_data = ({ raw, search }) => {
  var structured = {};
  if (search?.length > 0) {
    const filter = raw.filter(row =>
      row.content.$t
        .replace(' ', '')
        .replace('player', '')
        .replace('pos', '')
        .replace('date', '')
        .replace('injury', '')
        .replace('status', '')
        .replace('expectedreturn', '')
        .replace('comments', '')
        .replace(':', '')
        .toLowerCase()
      .includes(search.toLowerCase()));
    raw = filter;
  }


  for (var row of raw) {
    row = injuries_key_mapping.reduce((acc, { key_init, key_final, key_head }) => ({ ...acc, [key_final]: row[key_init]?.$t }), {})

    var team = row['team']
    structured[team] = {
      ...(structured[team] || []),
      injuries: [...(structured[team]?.injuries || []), row]
    }
  }
  for (var team in structured) {
    structured[team] = {
      ...structured[team],
      ...get_team_data(team)
    }
  }
  return structured
}

const EachTeamInjuries = ({ team_ob }) => {
  const { teamName, teamImg, injuries } = team_ob;
  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="row-flex flex-start">
            <LargeLogo image={teamImg} />
            <h5 className="bold center">{teamName}</h5>
          </div>
          <div className="spacing-10px"></div>

          {injuries && injuries.length != 0 ? (
            <>
              <table>
                <tbody>
                  <tr>
                    {injuries_key_mapping.slice(2).map(({ key_head }) => (
                      <th>{key_head}</th>
                    ))}
                  </tr>
                  {injuries?.map((inj) => (
                    <>
                      <tr>
                        <th>{inj['player']}</th>
                        {injuries_key_mapping.slice(3).map(({ key_final }) => (
                          <td>{inj[key_final]}</td>
                        ))}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
              <h6 className="center head">No Injuries</h6>
            )}
        </div>
      </div>
    </>
  )
}

const InjuriesJSX = (props) => {
  // console.log('injuries jsx props=>', props);
  const { api_data } = props;
  const raw = api_data.feed.entry;
  console.log('injuries jsx raw=>', raw);

  const [search, set_search] = useState('');

  const structured = structure_injuries_raw_data({ raw, search });
  console.log('injuries jsx strucured=>', structured);


  return (
    <div className="">
      <div className="center">
        <input onChange={(e) => { set_search(e.target.value) }} type="text" value={search} placeholder="Search" />
      </div>
      {Object.keys(structured).map(team =>
        <>
          <EachTeamInjuries {...{ team_ob: structured[team] }} />
          <hr />
        </>
      )}
    </div>
  )
}

function InjuriesPage() {
  console.log('injury page')
  return (
    <div>
      <h1 className="center">NBA Injuries</h1>
      <GetFromAPI api={get_sheet_url({ sheet_id, sheet_no })} >
        <InjuriesJSX />
      </GetFromAPI>
    </div>
  )
}

export default InjuriesPage
