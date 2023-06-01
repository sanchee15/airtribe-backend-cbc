const indexName = 'product_data';
const ESClient = require('../configs/elasticsearch').ESClient;
const Product = require('../models/products_sequelize').Product;


const indexMappings = {
	properties: {
		product_id: { type: 'integer' },
		product_name: { type: 'text' },
		stock: { type: 'integer' },
		price: { type: 'float' },
	}
};


async function createBulkProductIndex() {
	const productData = await Product.findAll();
	try {
    	await ESClient.indices.create({
      		index: indexName
    	});

	    // Prepare the bulk indexing requests
	    const bulkRequests = [];

	    for (const product of productData) {
	      	const indexRequest = {
	        	index: { _index: indexName },
	        	data: {
		        	product_id: product.id,
		          	product_name: product.name,
		          	stock: product.stock,
		          	price: product.price,
	        	}
	      	};
	    	bulkRequests.push(indexRequest);
	    }

    	// Perform bulk indexing
    	const { body: bulkResponse } = await ESClient.bulk({ refresh: true, body: bulkRequests });

	    // Check the response for errors
	    if (bulkResponse.errors) {
	    	const erroredDocuments = [];

      		bulkResponse.items.forEach((action, i) => {
        		const operation = Object.keys(action)[0];
        		if (action[operation].error) {
          			erroredDocuments.push({
			            status: action[operation].status,
			            error: action[operation].error,
			            data: bulkRequests[i]
          			});
        		}
      		});

      		console.error('Error indexing documents:', erroredDocuments);
      	}
    } catch (e) {
        console.log(e);
        // throw new Error(e);
    }
}

module.exports = {createBulkProductIndex};

