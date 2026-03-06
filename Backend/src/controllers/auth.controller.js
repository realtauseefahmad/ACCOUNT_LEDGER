const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const emailService = require("../services/email.service")


/**
 * @desc User Registration Controller
 * @route POST /api/auth/register
 */

async function userRegisterController(req, res) {
    const { name, username, email, password } = req.body

    const isExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isExists) {
        return res.status(400).json({
            success: false,
            message: "User with this email or username already exists"
        })
    }

    const user = await userModel.create({
        name,
        username,
        email,
        password
    })

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: "4d" })

    res.cookie("token", token)

    res.status(201).json({
        user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    })

    //? Send registration email
    await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * @desc User Login Controller
 * @route POST /api/auth/login
 */

async function userLoginController(req,res){
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

   const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: "4d" })

    res.cookie("token", token)

    res.status(200).json({
        user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    userRegisterController,
    userLoginController
}