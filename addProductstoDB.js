// we re going to send products from products.json to our DB
require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/Product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        
        await Product.deleteMany() // were making sure theres nothing in
        // starting from scratch we dont have to do it
        await Product.insertMany(jsonProducts) // json products is an array
        // and we can go like that 
        process.exit(0) // processing to exit after adding products
        // 0 input if succesful
    } catch (error) {
        console.log(error)
        process.exit(1) // 1 input if error
    }
}

start()