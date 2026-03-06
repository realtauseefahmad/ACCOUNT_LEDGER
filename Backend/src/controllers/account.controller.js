const accountModel = require("../models/account.model")

async function createAccountController(req, res) {
    const account = await accountModel.create({
        user: req.user._id
    })

    return res.status(201).json({
        message: "Account created successfully",
        account
    })
}

module.exports = {
    createAccountController
}