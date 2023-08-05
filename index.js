const express = require('express');
const mysqlRoutes = require('./src/routes/products_sequelize');
const mongoRoutes = require('./src/routes/products_mongoose');
const ESRoutes = require('./src/routes/products_es');
const {sequalize, connectToMysql} = require('./src/configs/mysqldb');
const {redisClient, connectToRedis} = require('./src/configs/redis');
const {mongoClient, connectToMongo} = require('./src/configs/mongodb');
const {ESClient, connectToES} = require('./src/configs/elasticsearch');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', mysqlRoutes);
app.use('/app', mongoRoutes);
app.use('/index', ESRoutes);

app.get('/', (request, response) => {
  response.status(200).json({message: 'Hello World!'});
});

app.listen(PORT, async () => {
  console.log('Server is running at http://localhost:${PORT}');
  await connectToMysql();
  await connectToRedis();
  await connectToMongo();
  await connectToES();
});