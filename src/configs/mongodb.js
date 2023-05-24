// const Mongo = require('mongodb').MongoClient;
const { MongoClient, ServerApiVersion } = require('mongodb');

const password = encodeURIComponent("Airtribe@23");
const url = "mongodb+srv://sanchee:" + password + "@airtribecbc.xfklagj.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectToMongo = async ()=>{
	try{
		await mongoClient.connect();
		await mongoClient.db("admin").command({ ping: 1 });
		console.log("Successfully connected to the Mongodb.");
	}
	catch(error){
		console.log(error);
	}
}


module.exports = {mongoClient, connectToMongo}
