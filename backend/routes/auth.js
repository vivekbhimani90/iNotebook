const express = require("express");

const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodboy';
//Route 1 Create User
router.post(
  "/createuser",
  [
    body("name", " Please Enter Valid Name").isLength({ min: 3 }),
    body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Password Must Be Atleast 5 Cherecter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {


    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "User email is Already Exits." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);


      
      user = await Users.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
        
      })

      const data= {
        user : {
          id :user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      //res.json(user)
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send( "some error occurs");
    }
  }
);

//Route-2 User Login Route
router.post(
  "/login",
  [
    body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Password  can not be blank").exists()
  ],
  async (req, res) => {

    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
      
      return res.status(400).json({success, errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
    let user = await Users.findOne({email})
    if(!user){
      return res.status(400).json({ success,error:"Please try to correct credetial login account"})
    }
   const passwordCompare = await bcrypt.compare(password,user.password);
   if(!passwordCompare){
    return res.status(400).json({success,error:"Please try to correct credetial login account"})
  }

  const data= {
    user : {
      id :user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  //res.json(user)
  success=true;
  res.json({ success,authtoken});
      

}catch (error) {
        console.error(error.message);
        res.status(500).send("Inerval Server Error");
      }
})


//Route 3 Fecthcuser using middleware login required.
router.post("/getuser",fetchuser,async (req, res) => {

    try {
      userId=req.user.id;
      const user = await Users.findById(userId).select("-password")
      res.send(user);
      }catch (error) {
      console.error(error.message);
      res.status(500).send("Inerval Server Error");
    }

  })

   


module.exports = router;
