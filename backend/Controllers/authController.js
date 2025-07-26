const bcrpyt = require('bcrypt')
const User = require('../Models/User.js')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res)=>{
    //input all fields

   const {name , email , phone ,password ,role} = req.body
   if(!email || !name || !password || !phone || !role)
   {
    return res.status(400).json({message:"All Fields are required"})
   }

   //check for existing user DB search
   const existingUser = await User.findOne({email});
   if(existingUser)
   {
    return res.status(400).json({message:"Already Existing User"})
   }

   //Hash password using bycrypt
   const salt = await bcrpyt.genSalt(10);
   const hashedPassword = await bcrpyt.hash(password,salt);

   //Create and save User
   const newuser = new User({name,email,phone,password:hashedPassword,role})
   await newuser.save();

   //Send a success response
   res.status(200).json({message:"User Registered Succeefully"})

}

const loginUser = async (req,res)=>{
    const {email,password} =req.body;

    //check if user has entered both
    if(!email || !password) 
    {
    return res.status(400).json({message:"All Fields are required"})
   }

   //search for user entered mail if not found return 400
   const dbUser = await User.findOne({email})
   if(!dbUser)
   {
     return res.status(400).json({message:"User not found"})
   }

   //if found then do password matching
   const isMatch = await bcrpyt.compare(password , dbUser.password)
   if(!isMatch)
   {
     return res.status(400).json({message:"Invalid Email or Password"})
   }

   const token = jwt.sign( 
    { id: dbUser._id, role: dbUser.role },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
   )

   //if password match
    res.status(200).json({message:"User authorised successfully", user: {
    email: dbUser.email,
    role: dbUser.role,
    name: dbUser.name,
    phone: dbUser.phone
  },token})


}

module.exports = {registerUser , loginUser}