import 'babel-polyfill'
import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"

import BackEnd from "./backend"
injectTapEventPlugin();

ReactDOM.render(
  <BackEnd/>,
  document.getElementById("hello_world")
);
