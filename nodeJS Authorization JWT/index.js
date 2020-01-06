const express = require('express');
const app = express();
var mongoose = require('mongoose');

//import routes
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
//mongoose import
var config = require("config");
mongoose.connect(config.get('db'))
    .then(() => console.log("connected successfully"))
    .catch(err => console.log(err));






//Route MiddleWares
app.use(express.json());
app.use('/api/user', authRouter);
app.use('/api/posts', postRouter);
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
app.listen(5000, () => {
    console.log("running on server port 5000");
});
