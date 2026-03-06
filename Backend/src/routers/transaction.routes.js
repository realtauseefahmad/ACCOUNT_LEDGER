const {Router} = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const transactionController = require("../controllers/transaction.controller")



const transactionRouter = Router()

/**
 * - Post /api/transactions/
 * @desc create a new transaction
 * - protected route, only accessible to authenticated users
 */
transactionRouter.post("/",authMiddleware.authMiddleware, transactionController.createTransactionController)

/**
 *  - Post /api/transactions/system/inital-funds
 * @description create an initial fund transaction from the system account to a user account
 */
transactionRouter.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransactionController )


module.exports = transactionRouter