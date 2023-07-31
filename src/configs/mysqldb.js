const Sequalize = require('sequelize');


// Syntax for setting up a new connection 
// Sequalize (database_name, user_name, password, {dialect: database, host: host})

const sequalize = new Sequalize(
		'c2_lecture_2', 
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

const connectToMysql = async ()=>{
	try{
		await sequalize.authenticate();
		console.log("Successfully connected to the database.");
	}
	catch(error){
		console.log(error);
	}
}


module.exports = {sequalize, connectToMysql}