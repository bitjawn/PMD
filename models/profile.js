const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var profileSchema = new Schema({
    title: {type: String, unique: true, required: true},
    author: {type: String, required: true},
    username: {type: String, required: false, default: 'No username associated with this account'},
    password: {type: String, required: false, default: 'No password associated with this account'},
    email: {type: String, required: false, default: 'No email address associated with this account'},
    url: {type: String, required: false, default: 'No web address associated with this account'},
		description: {type: String, require: true},
		postDate: {type: String, required: true},
		postTime: {type: String, required: true},
		organization: {type: String, required: true},
});

profileSchema.statics.findByTitle = function(keyword, uid, cb) {
  return this.findOne({$and: [{title: new RegExp(keyword, 'i')}, {author: uid}]}, cb);
};

profileSchema.statics.findByUsername = function(keyword, uid, cb) {
  return this.find({$and: [{username: new RegExp(keyword, 'i')}, {author: uid}]}, cb);
};

profileSchema.statics.findByOrganization = function(keyword, uid, cb) {
  return this.find({$and: [{organization: new RegExp(keyword, 'i')}, {author: uid}]}, cb);
};

profileSchema.statics.findByEmail = function(keyword, uid, cb) {
  return this.find({$and: [{email: new RegExp(keyword, 'i')}, {author: uid}]}, cb);
};

profileSchema.statics.findByAuthor = function(keyword, cb) {
  return this.find({author: keyword}, cb);
};

module.exports = mongoose.model('Profile', profileSchema);
