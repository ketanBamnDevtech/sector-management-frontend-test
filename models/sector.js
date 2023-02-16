import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var sector = new Schema({
  name: {
    type: String,
    required: true
  },
  parent_id: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
});

mongoose.models = {};

var Sector = mongoose.model('Sector', sector);

export default Sector;
