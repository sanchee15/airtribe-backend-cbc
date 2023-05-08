const express = require('express');
const router = express.Router();
const Product = require('../models/products');


router.get('/products', async(request, response) => {
	const products = await Product.findAll();
	response.status(200).json(products);
});


router.post('/products', async(request, response) => {
	const {name, price, stock} = request.body;

	const product = Product.build({
		'name': name,
		'price': price,
		'stock': stock
	})

	await product.save().then(function(success){
		response.status(201).json(success);
	}).catch(function(error){
		response.json(error);
	});
	
});


router.get('/product/:id', async(request, response) => {
	const product = Product.findOne({
		where: {
			id: request.params.id
		}
	});
	await product.then(function(success){
		response.status(200).json(success);
	}).catch(function(error){
		response.json(error);
	});
});


router.patch('/product/:id', async(request, response) => {
	const data = request.body;

	const product = Product.update(data, {
		where: {
			id: request.params.id,
		}
	});

	await product.then(function(success){
		response.status(200).json(success);
	}).catch(function(error){
		response.json(error);
	});
});

module.exports = router;