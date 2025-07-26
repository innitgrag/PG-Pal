const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next)=>{
    // token comes as-> Authorization: Bearer eyJhbGciOi...

   const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Access Denied." });
  }

  const token = authHeader.split(" ")[1]; // ✅ Get just the token part
    try{
        const verified = jwt.verify(token , process.env.JWT_SECRET)
        console.log("Decoded Token:", verified);
        req.user = verified
        console.log(req.user)
    next()   
    }catch(error)
    {
         return res.status(400).json({message:"Invalid Token."})
    }
}




module.exports = authMiddleware