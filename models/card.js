// const mongoose = require('mongoose');

// const cardSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     require: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   link: {
//     type: String,
//     require: true,
//   },
//   likes: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     default: [],
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     require: true,
//   },
//   createAt: {
//     Date: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('card', cardSchema);
