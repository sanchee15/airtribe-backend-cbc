const express = require('express');
const router = express.Router();
const sequalize = require('../configs/mysqldb').sequalize;
const redisClient = require('../configs/redis').redisClient;
const Product = require('../models/products_sequelize').Product;
const ProductAttributes = require('../models/products_sequelize').ProductAttributes;


router.get('/products', async(request, response) => {
	const limit = parseInt(request.query.limit) || 10; // Default limit is 10
    const offset = parseInt(request.query.offset) || 0; // Default offset is 0

    const products = await Product.findAll({
        limit: limit,
        offset: offset
    });
    response.status(200).json(products);
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


router.get('/products/', async(request, response) => {
    const products = await Product.findAll();
    response.status(200).json(products);
});


router.post('/products/bulk_create', async(request, response) => {
    productDetailsList = request.body;

    await Product.bulkCreate(productDetailsList).then(function(success){
        response.status(200).json(success);
    }).catch(function(error){
        response.json(error);
    });
});


router.post('/product_attributes', async(request, response) => {
	const {product_id, attr_name, attr_value} = request.body;

	const product_attr = ProductAttributes.build({
		'productId': product_id,
		'attribute_name': attr_name,
		'attribute_value': attr_value
	})

	await product_attr.save().then(function(success){
		response.status(201).json(success);
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


router.get('/product_with_attributes/:id', async(request, response) => {
    const product = await Product.findOne({
        where: {
            id: parseInt(request.params.id)
        },
        include: ProductAttributes
    });

    response.status(200).send(JSON.stringify(product, null, 2));
});


router.get('/product_attributes/:id', async(request, response) => {
    const key = "product_attributes:" + request.params.id
    
    attribute_dict = {}

    redisClient.get(key).then(function(success){
        attribute_dict = JSON.parse(success);
    }).catch(function(error){
        console.log(error);
    });

    const product = await Product.findOne({
        where: {
            id: parseInt(request.params.id)
        }
    });
    merged_dicts = Object.assign({}, attribute_dict, product.dataValues);
    response.status(200).json(merged_dicts);
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

module.exports = router;