const express = require('express');

//init app 
const app = express();

// Set portnumber
const portnumber = process.env.PORT || 3000

// Start Server
app.listen(portnumber, function(){
    console.log('Server started port 3000');
});