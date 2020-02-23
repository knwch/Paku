const mysql = require('mysql');
const mysqlConfig = require('../config/db.mysql');

// Create a connection to database mysql
const connection = mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.password
});

// Start connection 
connection.connect((error) => {
    if (error) throw error;
    console.log('Mysql connect');
});

module.exports = connection;