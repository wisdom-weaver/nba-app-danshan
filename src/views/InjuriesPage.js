import { functionsIn } from "lodash";
import React, { useState } from "react";
import GetFromAPI from "../components/GetFromAPI";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import { get_all_teams, get_sheet_url, get_team_data } from "../utils/utils";

const sheet_id = "1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk";
const sheet_no = "7";

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
  }
];

const isEmpty = (search) => !search || search.length == 0;
const match_in_search = ({ search, match }) =>
  search &&
  match &&
  search
    .trim()
    .toLowerCase()
    .split(" ")
    .reduce(
      (sac, word) =>
        sac | match.trim().toLowerCase().replace(" ", "").includes(word),
      false
    );

const structure_injuries_raw_data = ({ raw, search }) => {
  var structured = {},
    stru_ar = [];
  for (var row of raw) {
    row = key_mapping_injuries.reduce(
      (acc, { key_init, key_final, key_head }) => ({
        ...acc,
        [key_final]: row[key_init]?.$t,
      }),
      {}
    );
    stru_ar.push(row);
  }
  get_all_teams().map((team) => {
    stru_ar.push({ team });
  });

  for (var row of stru_ar) {
    var { player, team, position, updated, injury, injurystatus } = row;
    var search_ar = [
      player,
      team,
      get_team_data(team).teamName,
      position,
      updated,
      injury,
      injurystatus,
    ];
    var check =
      search &&
      search
        .trim()
        .toLowerCase()
        .split(" ")
        .reduce(
          (acc, word) =>
            acc |
            search_ar.reduce(
              (eac, match = "") =>
                eac | match.toLowerCase().replace(" ", "").includes(word),
              false
            ),
          false
        );
    if ((search && check) || !search || search.length == 0) {
      structured[team] = {
        ...(structured[team] || []),
        injuries: player
          ? [...(structured[team]?.injuries || []), row]
          : structured[team]?.injuries,
      };
    }
  }
  for (var team in structured) {
    structured[team] = {
      ...structured[team],
      ...get_team_data(team),
    };
  }
  // console.log({ structured });
  return structured;
};

const EachTeamInjuries = ({ team_ob }) => {
  const { teamName, teamImg, injuries } = team_ob;
  return (
    <>
      <div className="card">
        <div className="card-content resp-card-content">
          <div className="row-flex flex-start">
            <LargeLogo image={teamImg} />
            <h5 className="bold center">{teamName}</h5>
          </div>
          <div className="spacing-10px"></div>
          {injuries && injuries.length != 0 ? (
            <>
              <div className="hide-on-small-only">
                <table>
                  <tbody>
                    <tr>
                      <th>Player</th>
                      <th>Pos/Imp</th>
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
                      <th>Pos/Imp</th>
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
        </div>
      </div>
    </>
  );
};

const InjuriesJSX = (props) => {
  // console.log('injuries jsx props=>', props);
  const { api_data } = props;
  const raw = api_data.feed.entry;
  // console.log('injuries jsx raw=>', raw);

  const [search, set_search] = useState("");

  const structured = structure_injuries_raw_data({ raw, search });
  // console.log('injuries jsx strucured=>', structured);

  return (
    <div className="">
      <div className="center">
        <input
          onChange={(e) => {
            set_search(e.target.value);
          }}
          type="text"
          value={search}
          placeholder="Search"
        />
      </div>
      {/* <p>{search}</p> */}
      {structured && Object.keys(structured).length > 0 ? (
        Object.keys(structured).map((team) => (
          <>
            <EachTeamInjuries {...{ team_ob: structured[team] }} />
            <hr />
          </>
        ))
      ) : (
        <div className="card">
          <div className="card-content">
            <h5 className="center">Nothing Found</h5>
          </div>
        </div>
      )}
    </div>
  );
};

function InjuriesPage() {
  // console.log('injury page')
  return (
    <div>
      <h5 className="center">NBA Injuries</h5>
      <GetFromAPI api={get_sheet_url({ sheet_id, sheet_no })}>
        <InjuriesJSX />
      </GetFromAPI>
    </div>
  );
}

export default InjuriesPage;
