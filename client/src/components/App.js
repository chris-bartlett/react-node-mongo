import React, { useEffect} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header";
import Landing from "./landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;



const App = (props) => {
    useEffect(() => {
        // fetch user data
        props.fetchUser( )


    }, []); // empty array means only run this once when component is first rendered


  return (
    <div className="container">
      <BrowserRouter>
        <div>
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