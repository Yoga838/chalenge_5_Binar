const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const accountController = require('./controllers/AccountController')
const Transaction = require('./controllers/TransactionsController')
const checkToken = require('./middleware/checkToken')

router.get('/',(req,res) => {
    return res.json({
        message:"hello world"
    })
})

//endpoint untuk login dan register
router.post('/auth/register', userController.registerUser)
router.post('/auth/login', userController.loginUser)
//autentikasi token login
router.get('/auth/authenticate', checkToken, userController.getProfile)
//endpoint untuk user
router.post('/users',userController.registerUser)
router.get('/users',userController.getUser)
router.get('/users/:id', userController.getUserById)
//endpoint untuk bankAccount
router.post('/accounts',accountController.registerAccount)
router.get('/accounts', accountController.getAccounnt)
router.get('/accounts/:id',accountController.getDetailAccount)
//endpoint untuk Bank Transaction
router.post('/transactions',Transaction.makeTransactions)
router.get('/transactions',Transaction.getAllTransactions)
router.get('/transactions/:id',Transaction.getDetailTransaction)
module.exports = router