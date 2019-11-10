var car = [{
        name: 'Mehran',
        color: 'Red',
        price: 100000
    },
    {
        name: 'Cultus',
        color: 'White',
        price: 300000
    },
    {
        name: 'Corrola',
        color: 'Black',
        price: 1500000
    }

];
var express = require('express');

var app = express();

app.get('/', (req, res) => {

    res.send("url with no parameter");

});
app.use(express.json()); //use to enable JSON
app.listen(3000, () => { console.log("listning at 3000") });
app.get('/cars/:name', function(req, res) {
    var data = car.find(c => c.name === (req.params.name));
    res.send("Price of car is " + parseInt(data.price));
});



app.get('/list', function(req, res) {
    res.send(car);

});
app.get('/price/:p', function(req, res) {
    var cars_1 = [];
    var count = 0;
    var p = parseInt(req.params.p);
    for (var i = 0; i < car.length; i++) {
        if (car[i].price > p) {

            cars_1.push(car[i]);
            count++;
        }
    }
    var price = car.find(c => c.price > req.params.p);
    res.send(cars_1);
});

app.put('/update/:name', function(req, res) {
    var nameofCar = req.params.name;
    console.log(nameofCar);
    var data = car.find(c => c.name === (req.params.name));
    if (!data) {
        res.status(404).send("Error");
    } else {
        data.name = req.body.name;
        data.price = req.body.price;
        res.send(data);
    }
});


app.delete('/car/delete/:name', function(req, res) {
    var cardel = car.find(c => c.name === (req.params.name));
    if (!cardel) {
        res.status(404).send("Not Found Car");
    } else {
        var carIndex = car.indexOf(cardel);
        car.splice(carIndex, 1);
        res.send(car);
    }
});
