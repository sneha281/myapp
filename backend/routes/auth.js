
const express = require('express');
const User = require('../models/User');

const router  = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Sneha$oy';
router.post('/createuser' , [
     body('name','Enter a valid name').isLength({ min: 3}),
    body('email','enterrr').isEmail(),
     body('password','Enter atleast 5 character').isLength({ min: 5 }),


],

async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    try{
     let user = await User.findOne ({email :req.body.email});
    if(user) {
        return res.status(400).json ({error :"User Exist with this Email"})
    }

     const salt =await bcrypt.genSalt(10);
     const secPass =await bcrypt.hash(req.body.password ,salt) 
     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password : secPass,
    });
    const data ={
        user:{
            id :user.id
        }
    }
    const autotoken =  jwt.sign(data , JWT_SECRET);
   res.json({autotoken})
   
} catch(error){  
    console.log(error.message);
    res.status(500).send("Some error occured")
} 
     
})




//authenticate a user
router.post('/login' , [
     
    body('email','enterrr').isEmail(),
     body('password','daal to kuch').exists(),
    


],async(req, res) =>{
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email , password } = req.body;
    try{
   let user = await User.findOne({email});
   if(!user){
       return res.status(400).json({error:"Please try to login with corect way"});

    }
    const passwordcompare = await bcrypt.compare(password , user.password);
    if(!passwordcompare){
        return res.status(400).json({error:"Please try to login with corect way"});
    }
   const data ={
        user:{
            id :user.id
        }
    }
    const autotoken = jwt.sign(data , JWT_SECRET);
    res.json({autotoken});
}
catch(error){
console.log(error.message);
    res.status(500).send("Internal Server Error");
    }
})

router.post('/getuser' ,fetchuser, async(req, res) =>{ 
    try {
   userId = req.user.id;
   const user = await User.findById(userId).select("-password")
   res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})


module.exports = router