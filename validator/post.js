const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = (data) => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.detail = !isEmpty(data.detail) ? data.detail : '';
    data.explanation = !isEmpty(data.explanation) ? data.explanation : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (!Validator.isLength(data.title, {min : 6 , max : 100})) {
        errors.title = `Title must be between 6 and 100 characters`;
    }
    if (!Validator.isEmpty(data.title)) {
        errors.title = `Title field is required`;
    }
    if (!Validator.isEmpty(data.detail.point)) {
        errors.point = `Point field is required`;
    }
    if (!Validator.isEmpty(data.detail.typeofpark)) {
        errors.typeofpark = `Type field is required`;
    }
    if (!Validator.isEmpty(data.detail.numberofcar)) {
        errors.numberofcar = `Number of car is required`;
    }
    if (!Validator.isNumeric(data.detail.numberofcar)) {
        errors.numberofcar = `Number of car must be Integer`;
    }
    if (!Validator.isEmpty(data.detail.typeofcar)) {
        errors.typeofcar = `Type car is required`;
    }
    if (!Validator.isEmpty(data.date.open)) {
        errors.open = `Opne field is required`;
    }
    if (!Validator.isEmpty(data.date.close)) {
        errors.close = `Close field is required`;
    }
    if (!Validator.isEmpty(data.explanation.about)) {
        errors.about = `About field is required`;
    }
    if (!Validator.isLength(data.explanation.about, {min : 6 , max : 300})) {
        errors.about = `About must be between 6 and 300 characters`;
    }
    if (!Validator.isEmpty(data.price)) {
        errors.price = `Price field is required`;
    }
    if (!Validator.isNumeric(data.price)) {
        errors.price = `Price must be Integter`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}