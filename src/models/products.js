const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');

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
	},
	stock: {
		type: DataTypes.INTEGER
	}
})


// sequalize.sync()

module.exports = Product 