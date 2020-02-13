const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateImageURL = (data) => {
    let errors = {};

    data.imageURL = !isEmpty(data.imageURL) ? data.imageURL : '';

    if (Validator.isEmpty(data.imageURL)) {
        errors.photo = `Photo Upload Errors`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}