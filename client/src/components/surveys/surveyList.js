import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyList = ({fetchSurveys, surveys}) => {

    useEffect(() => {
        fetchSurveys();
    }, []);

    const renderSurveys = () => {
        return surveys.map(survey => {
          return (
            <div className="card darken-1" key={survey._id}>
              <div className="card-content">
                <span className="card-title">{survey.title}</span>
                <p>
                  {survey.body}
                </p>
                <p className="right">
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Yes: {survey.yes}</a>
                <a>No: {survey.no}</a>
              </div>
            </div>
          );
        });
      }

    return (
        <div>
           {surveys && renderSurveys()}
        </div>
    );
};

const mapStateToProps = ({ surveys }) => {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);