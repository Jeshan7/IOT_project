var mongoose =  require('mongoose');

var lightSchema = new mongoose.Schema({
  mode: { type: String , default: "auto"},
  count: { type: Number,  default: 0}
})

var Light =  mongoose.model('Light', lightSchema);
module.exports = Light;
