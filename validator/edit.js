const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateEditProfile = (data) => {
    let errors = {};

    data.phone = !isEmpty(data.phone) ? data.phone : '';
    
    if (Validator.isEmpty(data.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (!Validator.isLength(data.phone, {min: 10, max: 10})) {
        errors.phone = `Phone must be 10 number`;
    }
    if (!Validator.isNumeric(data.phone)) {
        errors.phone = `Phone must be Integer`;
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}