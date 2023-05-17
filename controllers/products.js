const {StatusCodes} = require('http-status-codes')
const Product = require('../models/Product')


const getAllProducts = async(req, res) => {
    const {company, sort, select, name, page, numericFilters} = req.query
    const queryObject = {}
    let result =  Product.find(queryObject) // it returns a promise
    
    if(select) {
        const selectList = select.split(',').join(" ")
        result = Product.find({}).select(selectList)
    }
    if(numericFilters) {
        const operatorMap = {
            
        }


    }
    if(name) {
        const regex = new RegExp(name, 'i')
        result = Product.find({name: { $regex: regex }})
    }

    if(company) {
        queryObject.company = company
    }

    if(sort) {
        const sortList = sort.split(',').join(" ") // syntax must be like(price name)
        result.sort(sortList)
    }
    //pagination
    
    let limit = 7  || req.query.limit
    const skip = (page - 1) * limit 
    result.skip(skip).limit(limit)


    const products = await result
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