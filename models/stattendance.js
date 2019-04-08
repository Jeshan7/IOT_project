var mongoose =  require('mongoose');

var stattendanceSchema = new mongoose.Schema({
  id: Number,
})

var Stattendance =  mongoose.model('Stattendance', stattendanceSchema);
module.exports = Stattendance;
