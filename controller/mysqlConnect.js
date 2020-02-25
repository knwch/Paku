const mysql = require('mysql');
const mysqlConfig = require('../config/db.mysql');

// Create a connection to database mysql
const connection = mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});

// Start connection 
connection.connect((error) => {
    if (error) throw error;
    console.log('Mysql Connected');
});

module.exports = connection;