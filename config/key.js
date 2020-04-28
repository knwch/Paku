// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./keys_prod');
// } else {
//   module.exports = require('./keys_dev');
// }
module.exports = {
  // || 'mongodb://localhost:27017/paku'
  mongoURI : `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0-dj7pf.mongodb.net/paku?retryWrites=true&w=majority` ,
  secretOrKey: `${process.env.secretOrKey}`
}