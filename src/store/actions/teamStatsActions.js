export const updateTeamStatsAction = (obj) => {
  return (dispach, getState) => {
    // console.log('in updateTeamStatsAction', obj)
    return dispach({
      type: "SET_TEAM_STATS_DATA_FOR_SUBCAT",
      ...obj,
    });
  };
};

export const set_stats_at_key_action = (obj) => {
  return (dispach, getState) => {
    // console.log('in updateTeamStatsAction', obj)
    return dispach({ type: "SET_STATS_AT_KEY", ...obj });
  };
};

export const updateGameStreaksAction = (obj) => {
  return (dispach, getState) => {
    // console.log('in updateGameStreaksAction', obj)
    return dispach({
      type: "SET_GAME_STREAKS_DATA_FOR_SUBCAT",
      ...obj,
    });
  };
};

export const get_team_stats_at_key_only_action = ({ team, category, subcategory, key }) => {
  return (dispach, getState) => {
    try {
      return getState().teamStats[category][subcategory].stats[key][team];
    } catch (err) {
      return {};
    }
  };
};
export const get_all_team_stats_action = ({ team, category, subcategory, keys }) => {
  return (dispach, getState) => {
    const store = getState();
    try {
      return Object.fromEntries(
        ['a', ]
      )
    } catch (err) {
      return {};
    }
  };
};
