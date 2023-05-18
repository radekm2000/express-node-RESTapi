const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const connectDB = require('./db/connect')
//handling async errors
require('express-async-errors')
//error handlers
const NotFoundError = require('./customErrors/notfoundError')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
//routes
const productRouter = require('./routes/productroutes')
const taskRouter = require('./routes/taskroutes')
const authRouter = require('./routes/authroutes')

const authenticateUser = require('./middleware/authenticateUser')
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('server started')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tasks',authenticateUser, taskRouter)
app.use('/api/v1/products', productRouter)
app.use(NotFoundError)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 8080

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is litening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}


start()