module.exports = {
  // mongoURI: process.env.MONGO_URI,
  mongoURI : `mongodb+srv://paku:${encodeURIComponent('findbyyou')}@cluster0-dj7pf.mongodb.net/paku?retryWrites=true&w=majority`,
  // mongoURI:'mongodb://localhost:27017/paku',
  secretOrKey: 'yoursecret'
}