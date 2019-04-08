var mongoose =  require('mongoose');

var attendanceSchema = new mongoose.Schema({
  id: Number,
  date: Date.mow()
})

var Attendance =  mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
