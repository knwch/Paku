module.exports = {
  mongoURI : `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0-dj7pf.mongodb.net/paku?retryWrites=true&w=majority` || 'mongodb://localhost:27017/paku',
  secretOrKey: `${process.env.secretOrKey}` || 'secretOrKey'
}