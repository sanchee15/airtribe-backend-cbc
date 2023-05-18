// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Product = sequalize.define('product', {
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	name: {
		type: DataTypes.STRING(100)
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})

// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Product 