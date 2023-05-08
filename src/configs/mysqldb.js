const Sequalize = require('sequelize');


const sequalize = new Sequalize(
		'instamart',
		'root',
		'Airtribe@23',{
			dialect: 'mysql',
			host: 'localhost'
		});



const connectToDB = async ()=>{
	try{
		await sequalize.authenticate();
		console.log("Successfully connected to the database.");
	}
	catch(error){
		console.log(error);
	}
}


module.exports = {sequalize, connectToDB}