require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

mongoose.connect(process.env.MONGODB_URI ,{useNewUrlParser:true});
var root = require('./routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret : process.env.secret,
    resave : false,
    saveUninitialized : true
}))


//Express-Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg , value) {
        var namespace = param.split('.'), root = namespace.shift(), formParam = root;

        while(namespace.length){
            formParam += '['+namespace.shift()+']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

app.set('views',__dirname + '/public');
app.engine('html',require('ejs').renderFile)
app.set('view engine','ejs');



app.use('/',root);

app.use(express.static(__dirname+'/public'));


var PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})