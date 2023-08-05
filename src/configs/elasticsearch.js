const {Client} = require("@elastic/elasticsearch");

const ESClient = new Client({ node: 'http://localhost:9200' });


const connectToES = async () => {
    try {
        const { body } = await ESClient.cluster.health();
        console.log('Elasticsearch Cluster health:', body.status);
    } catch (error) {
        console.error('Error checking cluster health:', error);
    }
};


module.exports = {ESClient, connectToES}
