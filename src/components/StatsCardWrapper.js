import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { post_fetch_api_at_stat_key } from "../views/StatsTabsCard2";
import { structure_matchup_data } from "./stats_cards_components/basketball-nba-tabs/MatchTab";

const get_each_config = async ({ config, category, subcategory }) => {
  const [key, ob] = config;
  const { apis, structure_data } = ob;
  var data_ar = [];
  for (var i = 0; i < apis.length; i++) {
    await fetch(apis[i])
      .then((resp) => resp.json())
      .then((data) => data_ar.push(data))
      .catch(() => data_ar.push([]));
  }
  await post_fetch_api_at_stat_key({
    data_ar,
    category,
    subcategory,
    structure_data,
  });
};

function StatsCardWrapper(props) {
  const {
    post_fetch_api_at_stat_key,
    category,
    subcategory,
    configs,
    match_api,
    sag_api,
  } = props;

  const [inti_once, set_inti_once] = useState(false);
  const init_fetch = () => {
    var data_ar = [];
    set_inti_once(true);
    Object.entries(configs).forEach((config) =>
      get_each_config({ config, category, subcategory })
    );
  };
  useEffect(() => {
    if (inti_once) return;
    init_fetch();
  }, [inti_once]);
  const [a, set_a] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      set_a(true);
    }, 3000);
  }, [a]);

  return <>{props.children}</>;
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  StatsCardWrapper
);
