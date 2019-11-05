var express = require('express');

var app = express();

app.get('/', (req, res) => {

    res.send("url with no parameter");

});
app.use(express.json()); //use to enable JSON
app.listen(3000, () => { console.log("listning at 3000") });

var Car = [{
        Name: "Mehran",
        Color: "Red",
        Price: 1000000,
        Make: 2017,
        Location: "Lahore"
    },
    {
        Name: "Cultus",
        Color: "Blue",
        Price: 1500000,
        Make: 2019,
        Location: "Lahore"

    }, {
        Name: "Corolla",
        Color: "Black",
        Price: 2000000,
        Make: 2016,
        Location: "Karachi"
    }
];
//get total number of cars
app.get('/cars', (req, res) => {
    var length = Car.length;
    console.log(length);
    res.send("Total Counts of Car is " + length);
});
//search car by name
app.get('/car/:name', (req, res) => {
    var name = req.params.name;
    var car = Car.find(c => c.Name === name);
    if (car != null) {
        res.send(car);
    } else {
        res.status(404).send("Car not found");
    }
});
//list cars by location and price between  minprice and maxprice
app.get('/listcars/:location/:minprice/:maxprice', (req, res) => {
    var listofcars = [];
    var location = req.params.location;
    var minprice = req.params.minprice;
    var maxprice = req.params.maxprice;
    for (var i = 0; i < Car.length; i++) {
        console.log(Car[i].Location === location);
        console.log(Car[i].Price >= minprice);
        if (Car[i].Location === location && (parseInt(Car[i].Price) >= minprice && parseInt(Car[i].Price) <= maxprice)) {
            listofcars.push(Car[i]);
            console.log("Yes matched listofcars");

        }

    }
    if (listofcars == null) {
        res.status(404).send("Car not found");
    } else {
        res.send(listofcars);
    }
});
//insert a new car
app.post('/insert', (req, res) => {
    var car = {
        Name: req.body.Name,
        Color: req.body.Color,
        Price: req.body.Price,
        Make: req.body.Make,
        Location: req.body.Location,
    }
    var d = Car.find(c => c.Name === car.Name);
    if (d == null) {
        Car.push(car);
        res.send(Car);
    } else {
        res.status(404).send("Error in adding new car.");
    }
});
//insert new car whose clr is not red and price>2000000 and make is in between 2015 and 2019
app.post('/insert/car/', (req, res) => {
    var clr = req.body.Color;
    var price = req.body.Price;
    var make = req.body.Make;
    var name = req.body.Name;
    var loc = req.body.Location;
    //var makes = [2015, 2016, 2017, 2018, 2019];

    if ((clr != "Red" || clr != "red") && price > 2000000 && (make >= 2015 && make <= 2019)) {
        var car = {
            Name: name,
            Color: clr,
            Price: price,
            Make: make,
            Location: loc
        };
        Car.push(car);
        res.send(Car);
    } else {
        res.status(404).send("Car constraints not matched");
    }
});
//update Location of cars from Karachi to ISB
app.put('/update', (req, res) => {
    var c = 0;
    for (var i = 0; i < Car.length; i++) {
        if (Car[i].Location == "Karachi") {
            c = c + 1;
            Car[i].Location = "Islamabad";
        }
    }
    if (c != 0)
        res.send(Car);
    else {
        res.status(404).send("Car with location Karachi not found");
    }
});
//delete car which is 10yrs old
app.delete('/delete', (req, res) => {
    //var cars = [];
    var c = 0;
    var date = new Date();
    var year = date.getFullYear();
    for (var i = 0; i < Car.length; i++) {
        if (Car[i].Make == year - 10) {
            c++;
            Car.splice(i, 1);
        }
    }
    if (c > 0) {
        res.send("Cars deleted");
    } else {
        res.status(404).send("10years old cars not found");
    }

});
// delete car by location and other than lahore.
app.delete('/deleteCar/:location', (req, res) => {
    var loc = req.params.location;
    var c = 0;
    for (var i = 0; i < Car.length; i++) {
        if (Car[i].Location != "Lahore" && Car[i].Location == loc) {
            Car.splice(i, 1);
            c++;
        }
    }
    if (c > 0) {
        res.send(Car);
        res.send("Cars deleted succesfully");
    } else {
        res.status(404).send("Car location is lahore which I cant delete.")
    }
});