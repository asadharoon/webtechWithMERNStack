var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs')

app.use(express.json()); //use to enable JASON

const mongoose = require('mongoose');

app.get('/', (req, res) => {

    res.send("url with no parameter");

});

mongoose.connect('mongodb://localhost/task14')
    .then(() => console.log("connected successfully"))
    .catch(err => console.log(err));
var schema = new mongoose.Schema({
    FirstName: String,
    LastName: String
});
const Human = mongoose.model('Human', schema);
var Humans = [{
        FirstName: 'Ali',
        LastName: 'Khan'
    },
    {
        FirstName: 'Usama',
        LastName: 'Butt'
    },
    {
        FirstName: 'Nimra',
        LastName: 'Khan'
    }
];

app.get('/Home', (req, res) => {

    res.sendFile(path.join(__dirname + '/views/signup.html'));

    //res.sendFile(path.join(__dirname+'/OutPut.ejs' , {qs : req.body}));
});

//Answer to point 6
app.post('/show', urlencodedParser, (req, res) => {

    console.log("Kia masla" + req.body.firstname)
    var human = new Human({
        FirstName: req.body.firstname,
        LastName: req.body.lastname
    });
    Humans.push(human);
    human.save();

    //res.render('OutPut', { human })
    console.log(human.get('FirstName'));
    res.render('Output', { human: human })
});

app.listen(8080, () => { console.log("listning at 8080") });