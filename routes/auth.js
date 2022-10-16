const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Post request to create a user

router.post('/createuser',[
    body('email').isLength({ min: 10 }),
    body('password').isLength({ min: 3 }),
],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        Department: req.body.Department,
        DepartmentId:req.body.DepartmentId,
        DOB:req.body.DOB,
        Gender:req.body.Gender,
    }).then(user => res.json(user));
})

//Authenticate a user : No login required
router.get('/loginuser',[
    body('email').isLength({ min: 10 }),
    body('password').isLength({ min: 3 }),
], async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Sorry user with that username doesn't exists"});
        }
        const passwordCompare = password === user.password;
        if(!passwordCompare){
            return res.status(400).json({error:"Sorry user with that username doesn't exists"});
        }
        const payload = {
            user:{
                id: user._id,
            }
        }
        res.json(payload);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})

router.get('/loginAdmin',[
    body('email').isLength({ min: 10 }),
    body('password').isLength({ min: 3 }),
],async (req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const {email,password} = req.body;
    try {
        const adminlogin = "Admin has logedin successfully"
        if(email == "admin1233@gmail.com" && password == "12345")
            res.json(adminlogin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})

module.exports = router;