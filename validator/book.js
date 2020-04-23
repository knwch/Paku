const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateBookingInput = (data) => {
    let errors = {};

    data.Date = !isEmpty(data.Date) ? data.Date : '';
    data.detail.phone = !isEmpty(data.detail.phone) ? data.detail.phone : '';
    data.detail.idCar = !isEmpty(data.detail.idCar) ? data.detail.idCar : '';
    data.detail.payment = !isEmpty(data.detail.payment) ? data.detail.payment : '';
    data.detail.timein = !isEmpty(data.detail.timein) ? data.detail.timein : '';
    data.detail.timeout = !isEmpty(data.detail.timeout) ? data.detail.timeout : '';
    data.detail.hours = !isEmpty(data.detail.hours) ? data.detail.hours : '';
    data.detail.price = !isEmpty(data.detail.price) ? data.detail.price : '';

    if (Validator.isEmpty(data.Date)) {
        errors.date = `Date field is required`;
    }
    if (Validator.isEmpty(data.detail.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (!Validator.isNumeric(data.detail.phone)) {
        errors.phone = `Phone must be Integer`;
    }
    if (Validator.isEmpty(data.detail.idCar)) {
        errors.phone = `Car regis field is required`;
    }
    if (Validator.isEmpty(data.detail.payment)) {
        errors.phone = `Payment field is required`;
    }
    if (Validator.isEmpty(data.detail.timein)) {
        errors.in = `Time in field is required`;
    }
    if (Validator.isEmpty(data.detail.timeout)) {
        errors.out = `Time out field is required`;
    }
    if (Validator.isEmpty(data.detail.hours)) {
        errors.out = `Time out field is required`;
    }
    if (Validator.isEmpty(data.detail.price)) {
        errors.price = `Price field is required`;
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}