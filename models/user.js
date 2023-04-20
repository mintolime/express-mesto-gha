const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Kim Nelson',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Тревел-блогер,фотограф',
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1641478740308-2ee190bb5ec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
