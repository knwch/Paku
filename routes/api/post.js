const express = require('express');
const route = express.Router();
const passport = require('passport');

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');

// import input validation
const validatePostInput = require('../../validator/post');

module.exports = route;