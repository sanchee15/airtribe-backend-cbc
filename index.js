const express = require('express');
const apiRoutes = require('./src/routes/products');
const {sequalize, connectToMysql} = require('./src/configs/mysqldb');
const {redisClient, connectToRedis} = require('./src/configs/redis');
const {mongoClient, connectToMongo} = require('./src/configs/mongodb');
const {ESClient, connectToES} = require('./src/configs/elasticsearch');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiRoutes);

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