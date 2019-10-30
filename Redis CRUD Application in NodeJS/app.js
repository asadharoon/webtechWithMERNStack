const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');


let client = redis.createClient();
client.on('connect', function() {
    console.log('Connected to Redis...');
});
//client.hset("id", 'id', 123, 'firstname', 'Asad', 'lastname', 'Haroon', 'email', 'asadharoon70', 'phone', '0335');
// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
app.engine('handlebars', exphbs({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride('_method'));

app.get('/add', function(req, res) {
    res.render('add');
});
app.get('/', function(req, res) {
    res.render('home', { layout: false });
});
app.post('/add', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var id = req.body.id;
    var email = req.body.email;
    var phoneNumber = req.body.phone;
    client.HGETALL(id, function(err, results) {
        console.log(err);
        console.log(results);
        if (results == null) {

            client.HMSET(id, ['firstname', firstname, 'lastname', lastname, 'email', email, 'PhoneNumber', phoneNumber],
                function(err, obj) {
                    if (err) {
                        res.send('Error');
                    } else {
                        res.redirect('/');
                    }
                });
        } else {
            res.render('add', {
                error: 'User already exists'
            });
        }
    });


});


// Search Page
app.get('/search', function(req, res, next) {
    res.render('search');
});
app.post('/searchuser', (req, res) => {
    let id = req.body.id;
    client.hgetall(id, function(err, obj) {

        if (!obj) {
            //res.send("Error in finding it");
            res.render('search', {
                'e': "User not exists"
            });
        } else {
            obj.id = id;
            res.render('searchdetails', {
                user: obj
            });
        }
    });


});
var k = new Array();

function getall() {
    client.keys('*', (err, keys) => {
        console.log("1st load");
        // ...

        for (var i = 0; i < keys.length; i++) {
            console.log("key[i] is" + keys[i]);
            k.push(keys[i]);
        }
        return keys;

    });

}

app.get('/delete', function(req, res, next) {
    res.render('delete');
});
app.post('/deleteuser', function(req, res) {
    var id = req.body.id;
    console.log(id);
    var st = client.hgetall(id, function(err, obj) {
        if (!obj) {
            res.render('delete', {
                'e': 'It does not exists.'
            });
        } else {
            client.del(id);
            res.render('delete', {
                's': 'Successfully Deleted this ID.'
            });
        }
    });



});
app.get('/update', function(req, res, next) {
    res.render('update');
});
app.post('/updateuser', function(req, res, next) {
    let id = req.body.id;
    client.hgetall(id, function(err, obj) {

        if (!obj) {
            //res.send("Error in finding it");
            res.render('update', {
                'e': "User not exists"
            });
        } else {
            obj.id = id;
            res.render('updatedetails', {
                user: obj
            });
        }
    });

});
app.post('/updateNew', function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var id = req.body.id;
    var email = req.body.email;
    var phoneNumber = req.body.phone;
    client.HMSET(id, ['firstname', firstname, 'lastname', lastname, 'email', email, 'PhoneNumber', phoneNumber],
        function(err, obj) {
            if (err) {
                res.send('Error');
            } else {
                res.render('updatedetails', {
                    s: 'Success'
                });


            }
        });
});

app.listen(port, function() {
    console.log('Server started on port ' + port);
});