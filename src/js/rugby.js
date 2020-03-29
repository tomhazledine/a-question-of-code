import React from "react";
import ReactDOM from "react-dom";
import "../scss/rugby.scss";

import Rugby from "./rugby/Rugby";
import RugbyRankings from "./rugby/RugbyRankings";

ReactDOM.render(<Rugby />, document.getElementById("rugby-pools"));
// ReactDOM.render(<RugbyRankings />, document.getElementById("rugby-rank-graph"));
console.log("done");
console.log("reloading");
