import { structure_matchup_data } from "../../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { structure_injuries_data } from "../../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import { structure_odds_data } from "../../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import { structure_trends_data } from "../../components/stats_cards_components/basketball-nba-tabs/TrendsTab";
import { structure_streaks_data } from "../../components/stats_cards_components/basketball-nba-tabs/StreaksTab";
import { structure_powerrankings_data } from "../../components/stats_cards_components/basketball-nba-tabs/PowerRankingsTab";

const initialState = {
  basketball: {
    nba: {
      status: {
        matchup: "not_loaded",
        injuries: "not_loaded",
        odds: "not_loaded",
        trends: "not_loaded",
        streaks: "not_loaded",
        powerrankings: "not_loaded"
      },
      configs: {
        matchup: {
          apis: [
            // match_api,
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json",
            // sag_api
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json",
          ],
          structure_data: structure_matchup_data,
        },
        injuries: {
          apis: [
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/7/public/values?alt=json",
          ],
          structure_data: structure_injuries_data,
        },
        odds: {
          apis: [
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/3/public/values?alt=json",
          ],
          structure_data: structure_odds_data,
        },
        trends: {
          apis: [
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/5/public/values?alt=json",
          ],
          structure_data: structure_trends_data,
        },
        streaks: {
          apis: [
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/9/public/values?alt=json",
          ],
          structure_data: structure_streaks_data,
        },
        powerrankings:{
          apis: [
            "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/8/public/values?alt=json",
          ],
          structure_data: structure_powerrankings_data,
        }
      },
    },
  },
};

export const teamStatsReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case "SET_STATUS_AT_KEY":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.subcategory]: {
            ...state[action.category][action.subcategory],
            status: {
              ...state[action.category][action.subcategory].status,
              [action.status_key]: action.status_update,
            },
          },
        },
      };
    case "SET_STATS_AT_KEY":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.subcategory]: {
            ...state[action.category][action.subcategory],
            stats: {
              ...state[action.category][action.subcategory].stats,
              [action.stat_key]: action.stat_structure,
            },
          },
        },
      };
    default:
      return state;
  }
};
