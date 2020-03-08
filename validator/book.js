const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateBookingInput = (data) => {
    let errors = {};

    data.bookDate = !isEmpty(data.bookDate) ? data.bookDate : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.idCar = !isEmpty(data.idCar) ? data.idCar : '';
    data.payment = !isEmpty(data.payment) ? data.payment : '';
    data.timeIn = !isEmpty(data.timeIn) ? data.timeIn : '';
    data.timeOut = !isEmpty(data.timeOut) ? data.timeOut : '';
    data.hours = !isEmpty(data.hours) ? data.hours : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (Validator.isEmpty(data.bookDate)) {
        errors.date = `Date field is required`;
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (!Validator.isNumeric(data.phone)) {
        errors.phone = `Phone must be Integer`;
    }
    if (Validator.isEmpty(data.idCar)) {
        errors.phone = `Car regis field is required`;
    }
    if (Validator.isEmpty(data.payment)) {
        errors.phone = `Payment field is required`;
    }
    if (Validator.isEmpty(data.timeIn)) {
        errors.in = `Time in field is required`;
    }
    if (Validator.isEmpty(data.timeOut)) {
        errors.out = `Time out field is required`;
    }
    if (Validator.isEmpty(data.hours)) {
        errors.out = `Time out field is required`;
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = `Price field is required`;
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}