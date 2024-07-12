const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required : true
  },
  password : {
    type : String, 
    required : true
  },
  friendlist : {
    type : Array,
    items : {
      type : String
    },
    default: []
  },
  blocklist : {
    type : Array,
    items : {
      type : String
    }, 
    default: []
  },
  beefs : {
    type : Array, 
    items : {
      type : String
    },
    default: []
  },
  sent_requests : {
    type: Array,
    items : {
      type : String
    }, 
    default: []
  },
  recieved_requests : {
    type: Array,
    items : {
      type : String
    }, 
    default: []
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)