'use strict';

let db = require('./database.js');
let mongoose = db.mongoose;
let connection = db.connection;
let Schema = mongoose.Schema;

let cardSchema = new Schema({
  'title': String,
  'description': String,
  'assignees': [ String ],
  'archived': Boolean,
  'list': Schema.Types.ObjectId,
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});
let Card = connection.model('Card', cardSchema);

let listSchema = new Schema({
  'title':  String,
  'description': String,
  'archived': Boolean,
  'board': Schema.Types.ObjectId,
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});
let List = connection.model('List', listSchema);

let boardSchema = new Schema({
  'title': String,
  'description': String,
  'owner': [ String ], // can be user, team, etc.
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});
let Board = connection.model('Board', boardSchema);

let userSchema = new Schema({
  'username': String,
  'createdAt': { type: Date, default: Date.now }
});
let User = connection.model('User', userSchema);

module.export = {
  List: List,
  Card: Card,
  Board: Board,
  User: User
};
