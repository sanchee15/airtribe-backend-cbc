const express = require('express');
const router = express.Router();
const ESClient = require('../configs/elasticsearch').ESClient;
const createBulkProductIndex = require('../scripts/create_bulk_product_index').createBulkProductIndex;


router.get('/products', async(request, response) => {
	const indexName = parseInt(request.query.index_name) || "product_data";
	try {
		const indexInfo = await ESClient.indices.get({
	  		index: indexName
		});

		console.log(indexInfo);
		response.status(200).json(indexInfo);
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

router.post('/products/bulk', async(request, response) => {
	try {
		createBulkProductIndex();
		response.status(201).json({"message": "Index successfully created."});
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

router.get('/products/search', async(request, response) => {
	try {
		const result = await ESClient.search({
			index: "product_data",
			body: {
        		query: {
          			match_all: {} // Match all documents
        		}
      		}
		})
		response.status(200).json(result.body.hits.hits);
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

module.exports = router;