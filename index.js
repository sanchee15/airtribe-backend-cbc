const express = require('express');
const apiRoutes = require('./routes');
const {sequalize, connectToDB} = require('./db');


const app = express();
const PORT = 3000;


app.use('/api', apiRoutes);

app.get('/', (request, response) => {
  response.status(200).json({message: 'Hello World!'});
});

app.listen(PORT, async () => {
  console.log('Server is running at http://localhost:${PORT}');
  await connectToDB();
});