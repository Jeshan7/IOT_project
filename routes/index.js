var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Student = require('../models/student');
var Attendance = require('../models/attendance');
var Light = require('../models/light');

 router.get('/main',(req,res)=>{
   res.render('main',{});
 })

 router.get('/email',(req,res)=>{
   res.render('email',{});

 })

router.get('/login',(req,res,next)=>{
    res.render('login',{});
})

router.post('/login',(req,res,next)=>{
    if(req.body.email && req.body.password ){

        User.authenticate(req.body.email,req.body.password,(error,user)=>{
           if(error || !user){
               var err = new Error('Wrong email or password');
               err.status=401;
               return next(error);
           }
         else {
               return res.redirect("/main");
            }
        })

    }else{
        var err = new Error("Email and password required");
        err.status=400;
        return next(err);
    }
})

router.get('/register',(req,res,next)=>{
    res.render('register',{});
})

router.post('/register',(req,res,next)=>{
     if( req.body.name && req.body.email && req.body.password && req.body.cpassword){

         if(req.body.password !== req.body.cpassword){
             var err = new Error("Passwords do not match");
             err.status = 400;
             return next(err);
         }

         var userData =  {
             name: req.body.name,
             email: req.body.email,
             password: req.body.password
         }
         User.create(userData, (error,user)=>{
             if(error)
              return next(error);
              else
              return res.redirect("/login");
         })
     }else{
         var err = new Error("All fields are required");
         err.status=400;
         return next(err);
     }
})

router.get('/student',(req,res,next)=>{
    res.render('student',{});
})

router.post('/student',(req,res,next)=>{
  const st0udent = new Student({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
   })

  student.save(function (err, Donate) {
  if (err)
    return console.log(err);
  else{
    res.send("done!!")
    }
  })
})

router.get('/attendance',(req,res,next)=>{
  Student.aggregate([
  { $group: { _id: null, myCount: { $sum: 1 } } },
  { $project: {
    _id: 0, myCount: '$myCount' } }
    ], function(err, result) {
    if(err)
      console.log(err)
    else
      var [x] = result;
      return res.render('attendance',{value: x.myCount});
  })
})

router.get('/light',(req,res)=>{
  res.render('light',{});
})

router.post('/light',(req,res)=>{
  if(req.body.name == "manual"){
    Light.update({}, {$set: {mode: "manual"}}, { multi: false }, function callback (err, numAffected) {
      return res.redirect("/state")
    })
  } else {
    console.log("Error");
  }

  if(req.body.name == "auto"){
    Light.update({}, {$set: {mode: "auto"}}, { multi: false }, function callback (err, numAffected) {
      return res.redirect("/main")
     })
   } else {
     console.log("Error");
   }
})

router.get('/state',(req,res)=>{
  res.render('state',{});
})

router.post('/state',(req,res)=>{
     if(req.body.name ){
       Light.update({}, {$set: {count: req.body.name}}, { multi: false }, function callback (err, numAffected) {
        return res.redirect("/main")
    })
  }
})

router.get('/showattendance', (req, res) =>{
  res.render('showattendance', {});
})

module.exports = router;
