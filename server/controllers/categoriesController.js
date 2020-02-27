const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");


exports.getAllCategoryProducts = (req, res, next) => {
    CategoryModel.findOne({ where: { id: req.params.id }, 
        attributes: ['title'],
        include: [
            {model: ProductModel, as: "products"}
        ]
    }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};

exports.getAllCategoriesForPanel = (req, res, next) => {
    CategoryModel.findAll({ where: { userId: req.user.id } }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getAllCategories = (req, res, next) => {
    CategoryModel.findAll({ where: { status: 1 } }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getCategoriesById = (req, res, next) => {
    CategoryModel.findOne({ where: { userId: req.user.id, status: 1, id: req.params.id } }).then(category => {
        return res.json({ category })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.createCategories = (req, res, next) => {
    const data = req.body;
    CategoryModel.create({
        title: data.title,
        description: data.description,
        status: data.status,
        previewImage: "category.jpg",
        userId: req.user.id,
    }).then(() => {
        return res.json({ message: "category Added" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.updateCategories = (req, res, next) => {

    const data = req.body

    CategoryModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(category => {

        if (!category) {
            return res.status(400).json({ message: "category not found" })
        }
        category.title = data.title;
        category.description= data.description;
        category.status= data.status;
        category.previewImage= data.previewImage;
        category.userId= req.user.id;
        category.save();
        return res.status(200).json({ message: "category was updated" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.deleteCategories = (req, res, next) => {

    CategoryModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(category => {

        if (!category) {
            return res.status(400).json({ message: "category not found" })
        }
        category.destroy().then(() => {
            return res.status(200).json({ message: "category was Deleted" })
        })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
