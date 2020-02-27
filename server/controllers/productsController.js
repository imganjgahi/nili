const ProductModel = require("../models/product")
const CategoryModel = require("../models/category")
const { Op } = require("sequelize");


exports.getAllProductsForPanel = (req, res, next) => {
    ProductModel.findAll({ where: { userId: req.user.id } }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};

exports.getAllProducts = (req, res, next) => {
    ProductModel.findAll({ where: { status: {[Op.gte]: 1} }, 
        include:[
            {model: CategoryModel, attributes: ['id','title'] }
        ] }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getProductsById = (req, res, next) => {
    ProductModel.findOne({ where: { userId: req.user.id, status: 1, id: req.params.id } }).then(product => {
        return res.json({ product })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.createProducts = (req, res, next) => {
    const data = req.body;
    ProductModel.create({
        title: data.title,
        lead: data.lead,
        description: data.description,
        categoryId: data.categoryId,
        tags: data.tags,
        status: data.status,
        price: data.price,
        previewImage: "product.jpg",
        userId: req.user.id,
    }).then(() => {
        return res.json({ message: "product Added" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.updateProducts = (req, res, next) => {

    const data = req.body

    ProductModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(product => {

        if (!product) {
            return res.status(400).json({ message: "Product not found" })
        }
        product.title = data.title;
        lead= data.lead;
        description= data.description;
        categoryId= data.categoryId;
        tags= data.tags;
        status= data.status;
        price= data.price;
        previewImage= data.previewImage;
        product.userId= req.user.id;
        product.save();
        return res.status(200).json({ message: "Product was updated" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.deleteProducts = (req, res, next) => {

    ProductModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(product => {

        if (!product) {
            return res.status(400).json({ message: "Product not found" })
        }
        product.destroy().then(() => {
            return res.status(200).json({ message: "Product was Deleted" })
        })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
