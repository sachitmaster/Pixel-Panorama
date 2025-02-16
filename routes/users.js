require('dotenv').config()
const mongoose =  require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect(`mongodb+srv://sachitkumarsahu6:2fqAJ4E7dG21FQJH@cluster0.lz3n5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

// Define the user schema
const userSchema =  mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  password: {
    type: String,
  },
});

// Create the User model
userSchema.plugin(plm)
module.exports  = mongoose.model('User', userSchema);