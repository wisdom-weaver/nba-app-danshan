const initialState = {
  basketball: {
    nba: {
      apis: [
        [
          "match_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json",
        ],
        [
          "sag_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json",
        ],
        [
          "trends_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/5/public/values?alt=json",
        ],
        [
          "odds_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/3/public/values?alt=json",
        ],
        [
          "injuries_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/7/public/values?alt=json",
        ],
        [
          "streaks_api",
          "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/9/public/values?alt=json",
        ],
        
      ],
    },
  },
};

export const teamStatsReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case "SET_STATS_AT_KEY":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.subcategory]: {
            ...state[action.category][action.subcategory],
            stats: {
              ...state[action.category][action.subcategory].stats,
              [action.stat_key]: action.stat_structure
            },
          },
        },
      };
    default:
      return state;
  }
};
