const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.birth = !isEmpty(data.birth) ? data.birth : '';
    data.age = !isEmpty(data.age) ? data.age : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.card = !isEmpty(data.card) ? data.card : '';
    
    if (!Validator.isLength(data.username, {min : 2 , max : 30})){
        errors.username = `Name must be between 2 and 30 characters`;
    }
    if (!Validator.isEmpty(data.username)) {
        errors.username = `Name field is required`;
    }
    if (!Validator.isLength(data.name.fname, {min : 2 , max : 30})) {
        errors.name = `FirstName must be between 2 and 30 characters`;
    }
    if (!Validator.isEmpty(data.name.fname)) {
        errors.name.fname = `FirstName field is required`;
    }
    if (!Validator.isLength(data.name.lname, {min : 2 , max : 30})) {
        errors.name.lname = `LastName must be between 2 and 30 characters`;
    }
    if (!Validator.isEmpty(data.name.lname)) {
        errors.name.lname = `LastName field is required`;
    }
    if (!Validator.isEmpty(data.email)) {
        errors.email = `Email field is required`;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = `Email is invalid`;
    }
    if (!Validator.isEmpty(data.birth)) {
        errors.birth = `Birthday field is required`;
    }
    if (!Validator.isEmpty(data.age)) {
        errors.age = `Age field is required`;
    }
    if (!Validator.isNumeric(data.age)) {
        errors.age = `Age must be Intger`;
    }
    if (!Validator.isEmpty(data.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (!Validator.isMobilePhone(data.phone, 'th-TH')) {
        errors.phone = `Phone number must be phone number of thailand`;
    }
    if (!Validator.isEmpty(data.card)) {
        errors.card = `Card field is requierd`;
    }
    if (!Validator.isNumeric(data.card)) {
        errors.card = `Card must be Integer`;
    }
    if (!Validator.isEmpty(data.password)) {
        errors.password = `Password field is required`;
    }
    if (!Validator.isLength(data.password, {min : 6 , max : 30})) {
        errors.password = `Password must be between 6 and 30`;
    }
    if (!Validator.isEmpty(data.password2)) {
        errors.password2 = `Confirm password field is erequired`;
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = `Passwords must match`;
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}