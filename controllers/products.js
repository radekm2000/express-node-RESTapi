const {StatusCodes} = require('http-status-codes')


const getAllProducts = async(req, res) => {
    res.status(StatusCodes.OK).json({msg: 'all products'})
}
const getSingleProduct = async(req, res) => {
    res.status(StatusCodes.OK).json({msg: 'single pduct'})
}
const createProduct = async(req, res) => {
    res.status(StatusCodes.OK).json({msg: 'created product'})
}
const updateProduct = async(req, res) => {
    res.status(StatusCodes.OK).json({msg: 'updated product'})
}
const deleteProduct = async(req, res) => {
    res.status(StatusCodes.OK).json({msg: 'deleted product'})
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}