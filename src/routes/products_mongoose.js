const express = require('express');
const router = express.Router();
const Product = require('../models/products_mongoose').Product;

router.get('/products', async(request, response) => {
    const products = await Product.find();

    response.status(200).json(products);
});


router.post('/products', async(request, response) => {
    const {name, price, stock} = request.body;

    const product = await new Product({
        'name': name,
        'price': price,
        'stock': stock
    })

    product.save().then(function(success){
        response.status(201).json(success);
    }).catch(function(error){
        response.json(error);
    });
    
});


module.exports = router;