const roleMiddleware = (expectedRole)=>{
    return (req,res,next) => {
    const role = req.user?.role
    console.log(req.user)
    if(!role)
    {
        return res.status(400).json({message:"Something went wrong"})
    }

    if(!expectedRole.includes(role))
    {
        return res.status(403).json({message:"Role not matching"})
    }

   next();
}
}
module.exports =roleMiddleware