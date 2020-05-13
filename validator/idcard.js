const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateIDCradInput = (data) => {
    let errors = {};

    data.idCard = !isEmpty(data.idCard) ? data.idCard : '';
    data.laser = !isEmpty(data.laser) ? data.laser : '';
    data.idCardURL = !isEmpty(data.idCardURL) ? data.idCardURL : '';
    data.idCardPerson = !isEmpty(data.idCardPerson) ? data.idCardPerson : '';

    if (Validator.isEmpty(data.idCard)) {
        errors.idCard = `IDCard field is required`;
    }
    if (!Validator.isLength(data.idCard, {min: 13, max: 13})) {
        errors.idCard = `IDCard must be 13 characters`;
    }
    if (!Validator.isNumeric(data.idCard)) {
        errors.idCard = `IDCard must be Integer`;
    }
    if (Validator.isEmpty(data.laser)) {
        errors.laser = `laser field is required`;
    }
    if (Validator.isEmpty(data.idCardURL)) {
        errors.idCardImage = `Please upload IDCard image`; 
    }
    if (Validator.isEmpty(data.idCardPerson)) {
        errors.idCardPerson = `Please upload IDCard Person`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}