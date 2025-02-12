import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./surveyField";
import validateEmails from "../../utils/validateEmails";
import formFIELDS from "./formFields";

const SurveyForm = (props) => {
    const renderFields = () => {
        // map over FIELDS array and return a Field component for each element
        return formFIELDS.map(({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />;
        });
    };


    return (
        <form onSubmit={props.handleSubmit(() => props.onSurveySubmit())}>
            {renderFields()}
            <Link to="/surveys" className="red btn-flat white-text">
                Cancel
            </Link>
            <button type="submit" className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
            </button>
        </form>
    );
};

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');


    formFIELDS.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a value for ${name}`;
        }
    });

    return errors;
};

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);