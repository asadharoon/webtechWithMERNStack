
var Employee = [{
    name: "Ali",
    age: 45,
    Salary: 100000,
    Post: "Manager"
}, {
    name: "Azam",
    age: 35,
    Salary: 80000,
    Post: "Employee"
}, {
    name: "Akram",
    age: 25,
    Salary: 25000,
    Post: "swiper"

}, {

    name: "Hira",
    age: 40,
    Salary: 100000,
    Post: "Manager"
}];
var Department = [{
        Name: "Accounts",
        Manager: "Ali",
        NumberofEmployees: 10
    },
    {
        Name: "C1",
        Manager: "Manager",
        NumberofEmployees: 20
    }, {
        Name: "H",
        Manager: "Hira",
        NumberofEmployees: 15
    }
];
var express = require('express');
var app = express();

app.use(express.json()); //use to enable JASON
app.get('/', (req, res) => {
    res.send(Department);
});
app.get('/', (req, res) => {
    var managers = [];
    for (var i = 0; i < Employee.length; i++) {
        if (Employee[i].Post == "Manager") {
            managers.push(Employee[i]);
        }
    }
    res.send(managers);
});
app.get('/manager/:name', (req, res) => {
    var name = req.params.name;
    var names = [];
    var c = 0;
    for (var i = 0; i < Employee.length; i++) {
        if (Employee[i].Post == "Manager") {
            names.push(Employee[i].name);
            c = c + 1;
        }

    }
    var depts = [];
    for (var i = 0; i < Department.length; i++) {
        if (Department[i].Name in names) {
            depts.push(Department[i]);
        }
    }
    if (c == 0) {
        res.status(404).send("Error");
    } else {
        res.send(depts);
    }

});
app.post('/new', (req, res) => {
    var name = req.body.Name;
    var age = req.body.Age;
    var sal = req.body.Salary;
    var post = req.body.Post;
    var emp = {
        Name: name,
        Age: age,
        Salary: sal,
        Post: post
    };
    var c = Employee.find(d => d.name == name);
    if (c != null) {
        Employee.push(emp);
        res.send(Employee);
    }
});
app.post('/new/emp', (req, res) => {
    var name = req.body.Name;
    var age = req.body.Age;
    var sal = req.body.Salary;
    var post = "Manager";
    var max = Department[0].NumberofEmployees;
    var deptname = Department[0].Name;
    var id = 0;
    for (var i = 1; i < Department.length; i++) {
        if (Department[i].NumberofEmployees > max) {
            max = Department[i].NumberofEmployees;
            deptname = Department[i].Name;
            id = i;
        }
    }
    var emp = {
        Name: name,
        Age: age,
        Salary: sal,
        Post: post
    };
    var dept = {
        Name: deptname,
        Manager: name,
        NumberofEmployees: Department[id].NumberofEmployees + 1
    }
    Employee.push(emp);
    Department.push(dept);
    res.send(Employee);
});
app.put('/update/emp', (req, res) => {
    var sal = 0.1;
    for (var i = 0; i < Employee.length; i++) {
        sal = 0.1 * Employee[i].Salary;
        Employee[i].Salary += sal;
    }
});
app.delete('/delete/', (req, res) => {
    var man = Department[0].Manager;
    var min = Department[0].NumberofEmployees;
    for (var i = 1; i < Department.length; i++) {
        if (Department[i].NumberofEmployees < min) {
            min = Department[i].NumberofEmployees;
            deptname = Department[i].Name;
            id = i;
            man = Department[i].Manager;
        }
    }

    Department.splice(id, 1);
    var sal = 0;
    for (var i = 0; i < Employee.length; i++) {
        if (Employee[i].name == man) {
            Employee[i].Post = "employee";
            var sal = 0.1 * Employee[i].Salary;
            Employee[i].Salary -= sal;
        }
    }
});