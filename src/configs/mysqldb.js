const Sequalize = require('sequelize');


// Syntax for setting up a new connection 
// Sequalize (database_name, user_name, password, {dialect: database, host: host})

const sequalize = new Sequalize(
		'c3_lecture_3',
		'root',
		'Airtribe@23', {
			dialect: 'mysql',
			host: 'localhost',
			pool: {
    			max: 5,
    			min: 0,
    			idle: 10000
  			}
  		});

// Check the connection to database - calling authenticate method

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