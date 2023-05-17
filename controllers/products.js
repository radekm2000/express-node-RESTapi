const {StatusCodes} = require('http-status-codes')
const Product = require('../models/Product')

const getAllProducts = async(req, res) => {
    
    const products = await Product.find({})

    res.status(StatusCodes.OK).json({products, count: products.length})
}
const getSingleProduct = async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOne({_id: productId})

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id ${productId}`})
    }

    return res.status(StatusCodes.OK).json(product)
}
const createProduct = async(req, res) => {  
    const product = await Product.create(req.body)

    res.status(StatusCodes.CREATED).json({msg: 'created product', product})
}
const updateProduct = async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOneAndUpdate({_id: productId}, req.body, {new: true, runValidators: true})

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id ${productId}`})
    }

    return res.status(StatusCodes.OK).json({msg: "Product changed.", product})
}
const deleteProduct = async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findByIdAndDelete({_id: productId})

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id ${productId}`})
    }

    return res.status(StatusCodes.OK).json({msg: "Product deleted"})
}


module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}