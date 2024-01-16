const mongoose =  require('mongoose')

// Define the post schema
const postSchema =  mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: [] 
  }
});

// Create the post model

module.exports  = mongoose.model('Post', postSchema);