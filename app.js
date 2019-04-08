var express = require('express');
var bodyParser = require('body-parser');
var handle = require('express-handlebars');
var path = require('path');
var mongoose = require('mongoose');
var session =  require('express-session');


// mongoose.connect("mongodb://localhost:27017/app");
// var db = mongoose.connection;
//
// db.on('error',console.error.bind(console,"Connection Error"));
var app = express();
const db = 'mongodb+srv://pankaj:pankaj02@cluster0-8vzqf.mongodb.net/iot?retryWrites=true';

mongoose.connect(db, {useNewUrlParser : true})
    .then(() => console.log("Mongodb connected..."))
    .catch(err => console.log(err));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.engine('handlebars',handle());
app.set('view engine','handlebars');

app.use('/public',express.static(path.join(__dirname,'public')));

var routes = require('./routes/index');
app.use('/',routes);

app.use(session({
    secret: "my name is khan",
    resave: true,
    saveUninitialized: false
}))


app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})
