const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = (data) => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.imagePost = !isEmpty(data.imagePost) ? data.imagePost : errors.image = `Please upload image`;
    data.typeofpark = !isEmpty(data.typeofpark) ? data.typeofpark : '';
    data.numberofcar = !isEmpty(data.numberofcar) ? data.numberofcar : '';
    data.typeofcar = !isEmpty(data.typeofcar) ? data.typeofcar : '';
    data.explain = !isEmpty(data.explain) ? data.explain : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
    data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
    data.open = !isEmpty(data.open) ? data.open : '';
    data.close = !isEmpty(data.close) ? data.close : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (!Validator.isLength(data.title, {min : 6 , max : 100})) {
        errors.title = `Title must be between 6 and 100 characters`;
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = `Title field is required`;
    }
    // if (Validator.isEmpty(data.imagePost)) {
    //     errors.image = `Please upload image`;
    // }
    if (Validator.isEmpty(data.typeofpark)) {
        errors.typeofpark = `Type field is required`;
    }
    if (Validator.isEmpty(data.numberofcar)) {
        errors.numberofcar = `Number of car is required`;
    }
    if (!Validator.isNumeric(data.numberofcar)) {
        errors.numberofcar = `Number of car must be Integer`;
    }
    if (Validator.isEmpty(data.typeofcar)) {
        errors.typeofcar = `Type car is required`;
    }
    if (Validator.isEmpty(data.explain)) {
        errors.explain = `Explain is required`;
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = `Address is required`;
    }
    if (Validator.isLatLong(data.longitude)) {  
        errors.map = `You must fix point in map`;
    }
    if (Validator.isLatLong(data.latitude)) {
        errors.map = `You must fix point in map`;
    }
    if (Validator.isEmpty(data.open)) {
        errors.open = `Opne field is required`;
    }
    if (Validator.isEmpty(data.close)) {
        errors.close = `Close field is required`;
    }
    if (Validator.isEmpty(data.price)) {
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