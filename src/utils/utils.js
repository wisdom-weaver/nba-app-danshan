import teamDataJSON from "../static/teamData.json";

const fetch_data = (url) => {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then((resp) => resp.json())
            .then((data) => resolve(data));
    });
};

export const get_team_data = (team)=>{
    return teamDataJSON[team];
}

export const get_sheet_url = ({ sheet_id, sheet_no }) =>
    `https://spreadsheets.google.com/feeds/list/${sheet_id}/${sheet_no}/public/values?alt=json`;