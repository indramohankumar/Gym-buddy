const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const requireAuth=async(req,res,next)=>{
    //verfiy auth
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }
    const token=authorization.split(' ')[1]
    try{
        const user=jwt.verify(token,process.env.SECRET)
        req.user=await User.findOne({_id:user._id}).select('_id')
        next()
    }catch(err){
        res.status(401).json({error:'Invalid authorization token'})
    }
}
module.exports=requireAuth
