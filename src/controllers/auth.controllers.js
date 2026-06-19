const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**
 * @name resgisterUserController
 * @desc Controller to handle user registration
 * @access
 */

async function registerUserController(req, res) { 

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:"Please provide all the required fields"});
}   

const isUserAlreadyExists =await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
})


if(isUserAlreadyExists){
    return res.status(400).json({message:"User with the same username or email already exists"});
}

const hash= await bcrypt.hash(password, 10);

const user= await userModel.create({ 
    username,
    email,
    password: hash
});

const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});

res.cookie("token", token)


res.status(201).json({
    message:"User registered successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
    }


/**
 * @name loginUserController
 * @desc Controller to handle user login
 * @access Public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});

    res.cookie("token", token);

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
        token
    });
}

module.exports ={
    registerUserController,
    loginUserController
}   