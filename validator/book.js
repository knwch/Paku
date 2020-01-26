const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateBookingInput = (data) => {
    let errors = {};

    data.date = !isEmpty(data.date) ? data.date : '';
    data.time = !isEmpty(data.time) ? data.time : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.regis = !isEmpty(data.regis) ? data.regis : '';
    data.note = !isEmpty(data.note) ? data.note : '';
    data.money = !isEmpty(data.money) ? data.money : '';
    // data.price = !isEmpty(data.price) ? data.price : '';

    if (Validator.isEmpty(data.date)) {
        errors.date = `Date field is required`;
    }
    if (Validator.isEmpty(data.time.in)) {
        errors.in = `Time in field is required`;
    }
    if (Validator.isEmpty(data.time.out)) {
        errors.out = `Time out field is required`;
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (!Validator.isNumeric(data.phone)) {
        errors.phone = `Phone must be Integer`;
    }
    if (Validator.isEmpty(data.regis)) {
        errors.phone = `Car regis field is required`;
    }
    if (!Validator.isNumeric(data.regis)) {
        errors.phone = `Car regis must be Integer`;
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = `Price field is required`;
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}