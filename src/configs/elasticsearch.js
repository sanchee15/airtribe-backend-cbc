var elasticsearch = require("elasticsearch");

const ESClient = new elasticsearch.Client({
    hosts: ["http://localhost:9200"]
});

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
