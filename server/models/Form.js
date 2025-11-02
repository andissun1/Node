const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const form = mongoose.model('form', formSchema);

module.exports = form;
