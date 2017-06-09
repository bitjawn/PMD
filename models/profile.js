const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var profileSchema = new Schema({
    title: {type: String, required: true},
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

profileSchema.statics.findByTitle = function(keyword, cb) {
  return this.find({title: new RegExp(keyword, 'i')}, cb);
};

profileSchema.statics.findByUsername = function(keyword, cb) {
  return this.find({username: new RegExp(keyword, 'i')}, cb);
};

profileSchema.statics.findByOrganization = function(keyword, cb) {
  return this.find({org: new RegExp(keyword, 'i')}, cb);
};

profileSchema.statics.findByEmail = function(keyword, cb) {
  return this.find({org: new RegExp(keyword, 'i')}, cb);
};

profileSchema.statics.findByAuthor = function(keyword, cb) {
  return this.find({author: keyword}, cb);
};

module.exports = mongoose.model('Profile', profileSchema);
