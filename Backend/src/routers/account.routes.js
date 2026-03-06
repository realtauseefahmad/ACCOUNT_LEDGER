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

/**
 * - Get /api/accounts/
 * @description get all accounts of the authenticated user
 * - protected route, only accessible to authenticated users
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * - Get /api/accounts/balance/:accountId
 * @description get the balance of a specific account
 * - protected route, only accessible to authenticated users
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = router