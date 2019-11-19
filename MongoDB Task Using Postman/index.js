const mongoose = require('mongoose');
var express = require('express');

var app = express();

app.get('/', (req, res) => {

    res.send("url with no parameter");

});
app.use(express.json()); //use to enable JSON
app.listen(3000, () => { console.log("listning at 3000") });
mongoose.connect('mongodb://localhost/courses')
    .then(() => console.log("connected successfully"))
    .catch(err => console.log(err));
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
//insert new course code
//insert 5 courses

app.post('/insert', (req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const tags = req.body.tags;
    const date = req.body.date;
    const isPublished = req.body.isPublished;
    Course.find({ name: name, author: author, tags: tags, date: date, isPublished: isPublished }, (err, result) => {
        console.log(result);
        if (result.length == 0) {
            var course = new Course({ name: name, author: author, tags: tags, date: date, isPublished: isPublished })
            course.save();
            res.send(course);
        } else {
            res.status(404).send("Already exists");
        }
    });

});
//list  all the courses which is published in current month
app.get('/list/:month', (req, res) => {
    // var courses = [];
    var getMonth = new Date().getMonth();
    var year = new Date().getFullYear();
    var start = new Date(year, getMonth, 1);
    var end = new Date(year, getMonth + 1, 0);
    //console.log(year);
    var s = new Date(year, req.params.month - 1, 1);
    var e = new Date(year, req.params.month, 0);

    Course.find({ date: { $gte: s, $lt: e } }, (err, result) => {
        if (result) {
            console.log(result);
            res.send(result);
        } else {
            res.status(404).send("Not found");
        }
    });

});
//remove the course which is not published yet
app.post('/remove/:name', (req, res) => {
    const name = req.params.name;
    Course.deleteOne({ name: name, isPublished: false }, (err, obj) => {
        if (err)
            res.send("error");
        res.send(obj);
        console.log("Successfully deleted");
    });
});
//list all courses
app.get('/listall/', (req, res) => {
    var c = Course.find((err, result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Course not found");
        }
    });

});