import { connect } from "react-redux";
// import withRouter from react-router-dom so we can pass history to the action creator
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    
    const reviewFields = Object.entries(formValues).map(([name, value]) => {
        return (
            <div key={name}>
                <label>{name}</label>
                <div>{value}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}

            <button className="green white-text btn-flat right" onClick={() => submitSurvey(formValues, history)}>   
                Send Survey
                <i className="material-icons right">email</i>
            </button>
            
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
