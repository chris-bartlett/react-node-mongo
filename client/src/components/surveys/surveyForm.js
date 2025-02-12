import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./surveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "emails" }
];


const SurveyForm = (props) => {

    console.log("SurveyForm props: ", props);

    const renderFields = () => {
        // map over FIELDS array and return a Field component for each element
        return FIELDS.map(({ label, name }) => {
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

    errors.emails = validateEmails(values.emails || '');


    FIELDS.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a value for ${name}`;
        }
    });

    return errors;
};

export default reduxForm({
    form: 'surveyForm',
    validate
})(SurveyForm);