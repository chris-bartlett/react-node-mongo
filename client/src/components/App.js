import React, { useEffect} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header";
import Landing from "./landing";
import Dashboard from "./dashboard";
import SurveyNew from "./surveys/surveyNew";

const App = (props) => {
    useEffect(() => {
        // fetch user data
        props.fetchUser( )


    }, []); // empty array means only run this once when component is first rendered


  return (
    <div className="container">
      <BrowserRouter>
        <div className="container">
            <Header />
            <Route path="/" component={Landing} exact  />
            <Route path="/surveys" component={Dashboard} exact />
            <Route path="/surveys/new" component={SurveyNew} />
        </div>

      </BrowserRouter>
    </div>
  );
}   

export default connect(null, actions)(App);