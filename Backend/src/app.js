const express = require("express")
const cookieParser = require("cookie-parser")

const authRouter = require("./routers/auth.routes")
const accountRouter = require("./routers/account.routes")
const transactionRouter = require("./routers/transaction.routes")



const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRouter)

module.exports = app