'use strict';

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let connection = mongoose.connect('mongodb://localhost:27017/clone');


module.exports = {
  mongoose: mongoose,
  connection: connection
}
