const express = require('express')
const app = express()
const connect = require('./db/connect')
const userRouter = require('./routes/userRoute')
const chatRouter = require('./routes/chatRouter')
const auth = require('./controller/authController')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)
app.use('/chat', auth, chatRouter)

connect.sync().then(() => {
    app.listen(5000, () => {
        console.log('Server Running on PORT 5000')
    })
}).catch(err => console.log('error ' + err))