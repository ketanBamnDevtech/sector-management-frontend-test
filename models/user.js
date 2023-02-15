import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: true
  },
  sector_ids: {
    type: [mongoose.Types.ObjectId],
    required: true
  },
  terms: {
    type: Boolean,
    required: true
  },
});

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;