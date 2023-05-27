const {Client} = require("@elastic/elasticsearch");

const client = new Client({ node: 'http://localhost:9200' });


const connectToES = async () => {
    try {
        const { body } = await client.cluster.health();
        console.log('Cluster health:', body.status);
    } catch (error) {
        console.error('Error checking cluster health:', error);
    }
};


module.exports = {client, connectToES}
