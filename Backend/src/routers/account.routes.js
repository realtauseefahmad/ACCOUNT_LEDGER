const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")



const router = express.Router()

/**
 *  - Post /api/accounts/
 * @desc create a new account
 * - protected route, only accessible to authenticated users
 */
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)

module.exports = router