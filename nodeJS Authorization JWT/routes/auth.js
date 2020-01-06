const router = require('express').Router();
const User = require('../models/User');
const joi = require('joi');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password:joi.string().min(6).required()
}

router.post('/login',async (req, res) => {
     //validate the data

    const { error } = joi.validate(req.body, schema);
    if (error) res.status(400).send(error.details[0].message);
    else
    {
       

        //if email already exists
        const userFromDB = await User.findOne({ email: req.body.email });
        if (!userFromDB) {
            return res.status(400).send("Email or password is incorrect");
        }
        //if password is incorrect
        const validPassword = await bcrypt.compare(req.body.password, userFromDB.password);
        if (!validPassword) {
            res.status(404).send("Password is incorrect");

        }
        //Create and assign token
        const token = jwt.sign({ _id: userFromDB._id }, config.get('jwtPrivateKey'));
        res.header('auth-token', token).send(token);
         res.send("Logged In");
    
        }

})


router.post('/register', async(req, res) => {
    
    //validate the data

    const { error } = joi.validate(req.body, schema);
//hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashPassword);
    if (error) res.status(400).send(error.details[0].message);
    else
    {
       

        //if email already exists
        const userFromDB = await User.findOne({ email: req.body.email });
        if (userFromDB) {
            return res.status(400).send("Email already exists");
        }
         const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        
        });
    
    
        const saved = await user.save();
        res.send(saved);
    
        }
   
   

});

module.exports = router;