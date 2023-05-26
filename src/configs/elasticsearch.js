var elasticsearch = require("@elastic/elasticsearch");

// const ESClient = new elasticsearch.Client({
//     nodes: [
//         { host: 'localhost', port: 9200 }
//     ],
//     auth: {
//         username: 'elastic', // Replace with the actual username
//         password: 'changeme', // Replace with the actual password
//     },
// });

const ESClient = new elasticsearch.Client({
    node: "http://localhost:9200"
})

console.log(ESClient);

const connectToES = async ()=>{
    try{
        ESClient.cluster.health({},function(err,response,status){
            if(response.status == 'green')
                console.log("Successfully connected to Elasticsearch.");
        });
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {ESClient, connectToES}
