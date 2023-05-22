const express = require('express');
const router = express.Router();
const sequalize = require('../configs/mysqldb').sequalize;
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
			id: parseInt(request.params.id)
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
			id: parseInt(request.params.id),
		}
	});

	await product.then(function(success){
		response.status(200).json(success);
	}).catch(function(error){
		response.json(error);
	});
});

router.patch('/product/:id/stock_update_self_managed', async(request, response) => {
	// Assuming Product ID and Product ID + 1 represent the same product type
	const data = request.body;
	const requested_id = parseInt(request.params.id);
	id_list = [requested_id, requested_id+1]
	const transaction = await sequalize.transaction()
	try{
		await Product.update(data, {
			where: {
				id: requested_id,
			}, transaction
		})
		// throw Error ('Error')
		await Product.update(data, {
				where: {
					id: requested_id + 1,
				}, transaction
			})
		await transaction.commit();
		const products = await Product.findAll({
			where:{
				id: id_list
			}
		})
		response.status(200).json(products);
	} catch (e) {
		await transaction.rollback();
		console.log(e);
		response.json({"message": "Transaction Rollbacked"});
	}
});


router.patch('/product/:id/stock_update_managed', async(request, response) => {
	const data = request.body;
	const requested_id = parseInt(request.params.id);
	try{
		const result = await sequalize.transaction(async (t) => {
			const product1 = await Product.update(data,{
				where: {
					id: requested_id,
				},
				transaction: t
			});
			const products = await Product.findAll({
				where:{
					id: requested_id
				},
				transaction: t
			})
			// throw new Error();
			response.status(200).json(products);
		});
		// throw new Error();
	} catch (e) {
		console.log(e);
		response.json({"message": "Transaction Rollbacked"});
	}
});


router.post('/product/:id/stock_update_with_lock', async(request, response) => {
	const data = request.body;

	try{
		const result = await sequalize.transaction(async (t) => {
			const product = await Product.findOne({
				where: {
					id: request.params.id,
				},
				lock: t.LOCK.UPDATE,
				transaction: t
			});
			product.stock = data.stock;
			const same_product = await Product.update({'stock': 11}, {
				where: {
					id: request.params.id,
				}
			})
			await product.save({transaction: t});
			response.status(200).json({"message": product});
		});
	} catch (error){
		response.json(error);
	}

});


module.exports = router;