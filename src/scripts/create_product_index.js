const indexName = 'product_data';
const ESClient = require('../configs/elasticsearch').ESClient;

async function createProductIndex() {
try {
	const { body } = await client.indices.create({
		index: indexName,
		body: {
			mappings: {
  				properties: {
  					product_id: { type: 'integer' },
	    			product_name: { type: 'text' },
	    			stock: { type: 'integer' },
	    			price: { type: 'float' },
  				}
			}
		}
	});
    console.log('Index created:', body);
  	} catch (error) {
    	console.error('Error creating index:', error);
  	}
}

module.exports = {createProductIndex};
