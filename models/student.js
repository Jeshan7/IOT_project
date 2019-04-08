var mongoose =  require('mongoose');

var studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String
})

var Student =  mongoose.model('Student', studentSchema);
module.exports = Student;
