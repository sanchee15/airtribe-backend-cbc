const mongoose = require('mongoose');

const password = encodeURIComponent("Airtribe@23");
const url = "mongodb+srv://sanchee:" + password + "@airtribecbc.xfklagj.mongodb.net/test?retryWrites=true&w=majority";

// const url = "mongodb://localhost:26061,localhost:26062/test";

const mongoConnection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToMongo = async ()=>{
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'MongoDB connection error:'));
		db.once('open', () => {
	  		console.log('Connected to MongoDB');
		});
}

module.exports = {mongoConnection, connectToMongo}


// Code to connect with mongo without Mongoose
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongoClient = new MongoClient(url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectToMongo = async ()=>{
// 	try{
// 		await mongoClient.connect();
// 		await mongoClient.db("admin").command({ ping: 1 });
// 		console.log("Successfully connected to the Mongodb.");
// 	}
// 	catch(error){
// 		console.log(error);
// 	}
// }


// module.exports = {mongoClient, connectToMongo}
