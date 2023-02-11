const Product = require('../models/product');

/**
* Get all existing products from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllProducts = (req, res) => {
    Product.find()
        // 200 : successful request (OK)
        .then((products) => res.status(200).json(products))
        // 400 : bad request
        .catch((error) => res.status(400).json({ error }));
};

/**
* For a user, get all its products from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllProductsFromUser = (req, res) => {
    const filter = { userId: req.params.user };

    Product.find(filter)
        // 200 : successful request (OK)
        .then((products) => res.status(200).json(products))
        // 400 : bad request
        .catch((error) => res.status(400).json({ error }));
};

/**
* Get a product in particular from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getOneProduct = (req, res) => {
    const filter = { _id: req.params.id };

    // get product with matching id
    Product.findOne(filter)
        // 200 : successful request (OK)
        .then((product) => res.status(200).json(product))
        // 404 : page not found
        .catch((error) => res.status(404).json({ error }));
};

/**
* Add a new product
* @param {object} req - request
* @param {object} res - response
*/
exports.createProduct = (req, res) => {
    // Create a new productObject with the parameters passed in the request
    const productObject = req.body.product;
    const product = new Product({ ...productObject });
    product.save()
        // 201 : successfully created a product (Created)
        .then(() => res.status(201).json({ message: 'Product added !' }))
        // 400 : bad request
        .catch((error) => res.status(400).json({ error }));
};

/**
* Modify an existing product
* @param {object} req - request
* @param {object} res - response
*/
exports.modifyProduct = (req, res) => {
    const filter = { _id: req.params.id };
    const productObject = { ...req.body };

    Product.findOne(filter)
        .then((product) => {
            // Check if the user is the one who created the product
            if (product.userId === req.auth.userId || req.auth.isAdmin) {
                // Update the product with the new one we created
                Product.updateOne(filter, {
                    ...productObject,
                    _id: req.params.id,
                })
                    // 200 : successful request (OK)
                    .then(() => res.status(200).json({ message: 'Product modified !' }))
                    // 400 : bad request
                    .catch((error) => res.status(400).json({ error }));
            } else {
                // 403 : Forbidden
                res.status(403).json({ error: 'access denied' });
            }
        });
};

/**
* Delete an existing product
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteProduct = (req, res) => {
    const filter = { _id: req.params.id };

    Product.findOne(filter)
        .then((product) => {
            // Check if the user is the one who created the product
            if (product.userId === req.auth.userId || req.auth.isAdmin) {
                // Delete the product.
                Product.deleteOne(filter)
                    // 200 : successful request (OK)
                    .then(() => res.status(200).json({ message: 'Product deleted !' }))
                    // 400 : bad request
                    .catch((error) => res.status(400).json({ error }));
            } else {
                // 403 : Forbidden
                res.status(403).json({ error: 'Access denied' });
            }
        })
        // 404 : page not found
        .catch((error) => res.status(404).json({ error }));
};

/**
* Like or Dislike a product
* @param {object} req - request
* @param {object} res - response
*/
exports.likeDislikeProduct = (req, res) => {
    const filter = { _id: req.params.id };

    // Check value of like to know what the user did
    if (req.body.like === 1) {
        // use the $inc and $push operators provided by Mongo DB to update the product
        Product.updateOne(filter, {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
        })
            // 200 : successful request (OK)
            .then(() => res.status(200).json({ message: 'Like' }))
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    } else if (req.body.like === -1) {
        // use the $inc and $push operators provided by Mongo DB to update the product
        Product.updateOne(filter, {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
        })
            // 200 : successful request (OK)
            .then(() => res.status(200).json({ message: 'Dislike' }))
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    } else if (req.body.like === 0) {
        Product.findOne(filter)
            .then((product) => {
                // Check if the user has liked the product
                if (product.usersLiked.includes(req.body.userId)) {
                    // use the $inc and $pull operators provided by Mongo DB to update the product
                    Product.updateOne(filter, {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId },
                    })
                        // 200 : successful request (OK)
                        .then(() => { res.status(200).json({ message: 'Like removed' }); })
                        // 400 : bad request
                        .catch((error) => res.status(400).json({ error }));
                } else if (product.usersDisliked.includes(req.body.userId)) {
                    // Check if the user has disliked the product
                    // use the $inc and $pull operators provided by Mongo DB to update the product
                    Product.updateOne(filter, {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId },
                    })
                        // 200 : successful request (OK)
                        .then(() => { res.status(200).json({ message: 'Dislike removed' }); })
                        // 400 : bad request
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    }
};
