import _ from "lodash";
import LargeLogo from "../../LargeLogo";
import { structure_raw_row_from_key_mapping } from "../stats_cards_components";

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

export const structure_injuries_data = (data_ar) => {
  var raw_injuries = data_ar[0].feed.entry;
  raw_injuries = structure_raw_row_from_key_mapping({
    raw: raw_injuries,
    key_mapping: key_mapping_injuries,
  });
  console.log("raw_injuries", raw_injuries);
  var str_injuries = _.groupBy(raw_injuries, "team");
  delete str_injuries[""];
  console.log("str_injuries", str_injuries);
  return { stat_structure: str_injuries, stat_key: "injuries" };
};

export const InjuriesTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const injuriesA = (statA && statA?.stats?.injuries) || [];
  const { teamB, teamB_Img, colorB } = statB;
  const injuriesB = (statB && statB?.stats?.injuries) || [];
  const injuries_big_ar = [
    { injuries: injuriesA, team_Img: teamA_Img, team: teamA },
    { injuries: injuriesB, team_Img: teamB_Img, team: teamB },
  ];
  console.log("injuries_big_ar", injuries_big_ar);
  return (
    <div className="card-content">
      <h5 className="center">Injuries</h5>
      {([
        { injuries: injuriesA || [], team_Img: teamA_Img, team: teamA },
        { injuries: injuriesB || [], team_Img: teamB_Img, team: teamB },
      ] || [])?.map(({ injuries= [], team_Img, team }) => (
        <>
          <div className="row-flex flex-start">
            <LargeLogo image={team_Img} />
            <h5 className="bold center">{team}</h5>
          </div>
          <div className="spacing-10px"></div>

          {injuries && injuries?.length != 0 ? (
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
                    {injuries &&
                      injuries?.map(
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
