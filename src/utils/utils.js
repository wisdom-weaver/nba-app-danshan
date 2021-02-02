import teamDataJSON from "../static/teamData.json";

const fetch_data = (url) => {
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => resolve(data));
  });
};

export const get_team_data = (team) => {
  if (team == "76ers" || team == "Seventysixers")
    return teamDataJSON["Seventysixers"] || {};
  if (team == "Blazers" || team == "Trailblazers")
    return teamDataJSON["Trailblazers"] || {};
  return teamDataJSON[team] || {};
};

export const get_all_teams = () => {
  return Object.keys(teamDataJSON);
};

export const get_sheet_url = ({ sheet_id, sheet_no }) =>
  `https://spreadsheets.google.com/feeds/list/${sheet_id}/${sheet_no}/public/values?alt=json`;

export const get_colors_combo = ({ colorsA, colorsB }) => {
  try {
    const colorsA = colorsA.map((ea) => ea.split(1));
    const colorsB = colorsB.map((ea) => ea.split(1));
    const diffs = [
      Math.abs(parseInt(colorsA[0], 16) - parseInt(colorsB[0], 16)),
      Math.abs(parseInt(colorsA[0], 16) - parseInt(colorsB[1], 16)),
      Math.abs(parseInt(colorsA[1], 16) - parseInt(colorsB[0], 16)),
      Math.abs(parseInt(colorsA[1], 16) - parseInt(colorsB[1], 16)),
    ];
    var indicies = diffs.findIndex((diff) => diff == Math.max(...diffs));
    indicies =
      (indicies == 0 && [0, 0]) ||
      (indicies == 1 && [0, 1]) ||
      (indicies == 2 && [1, 0]) ||
      (indicies == 3 && [1, 1]) ||
      console.log({ indicies });
    if (!(colorsA[indicies[0]] == 0 || colorsB[indicies[1]] == 0)) {
      var colorA_final = "#" + colorsA[indicies[0]];
      var colorB_final = "#" + colorsB[indicies[1]];
      return { colorA: colorA_final, colorB: colorB_final };
    }
  } catch (err) {
    return { colorA: colorsA[0], colorB: colorsB[0] };
  }
};
