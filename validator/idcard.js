const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateIDCradInput = (data) => {
    let errors = {};

    data.idCard = !isEmpty(data.idCard) ? data.idCard : '';
    data.idCardURL = !isEmpty(data.idCardURL) ? data.idCardURL : '';

    if (!Validator.isLength(data.idCard, {min: 13, max: 13})) {
        errors.idCard = `IDCard must be 13 characters`;
    }
    if (Validator.isEmpty(data.idCard)) {
        errors.idCard = `IDCard field is required`;
    }
    if (Validator.isNumeric(data.idCard)) {
        errors.idCard = `IDCard must be Integer`;
    }
    if (Validator.isEmpty(data.idCardURL)) {
        errors.idCardImage = `Please upload IDCard image`; 
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}