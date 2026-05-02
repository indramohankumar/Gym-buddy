const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const createtoken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
//login user
const loginUser = async(req, res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        //create a token
        const token = createtoken(user._id)
        return res.status(200).json({email,token})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
    
    res.json({message: 'login user'});
}


//signup user
const signupUser = async(req, res) => {
    const {email,password} = req.body
    try {
        const user = await
         User.signup(email,password)
        //create a token
        const token = createtoken(user._id)

    
        return res.status(200).json({email,token})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}
module.exports={
    loginUser,
    signupUser
    
}