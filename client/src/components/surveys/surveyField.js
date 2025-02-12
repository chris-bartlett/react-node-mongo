
const SurveyField = ({input, type, label, meta: { error, touched }}) => {
    // only show error if user has touched field and touched out
    return (
        <div>
            <label>{label}</label>
            <br />
           <input {...input} type={type} style={{ marginBottom: '5px' }} />
           <div className="red-text" style={{ marginBottom: '20px' }}>
           {error && touched ? <span>{error}</span> : null}
           </div>
        </div>
    );
};

export default SurveyField;