const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const beefSchema = new Schema({
  title: {
    type: String, 
    required: true
  }, 
  description: {
    type: String, 
    required: true
  }, 
  user1: {
    type: String, 
    required: true
  }, 
  user2: {
    type: String, 
    required: true
  },
  votesForUser1: {
    type: Number, 
    default: 0
  }, 
  votesForUser2: {
    type: Number, 
    default: 0
  },
  usersThatVotedForUser1: {
    type: Array, 
    items: {
      type: String
    }, 
    default: []
  }, 
  usersThatVotedForUser1: {
    type: Array, 
    items: {
      type: String
    }, 
    default: []
  },
}, {timestamps: true});

module.exports = mongoose.model('Beef', beefSchema); 