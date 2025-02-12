import { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './surveyForm';
import SurveyFormReview from './surveyFormReview';

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false);

    return (
        <div>
           {!showFormReview && <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />}
           {showFormReview && <SurveyFormReview onCancel={() => setShowFormReview(false)}  />}
        </div>
    );
};

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);