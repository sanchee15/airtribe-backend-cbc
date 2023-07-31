const redis = require('redis')

const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
})

const connectToRedis = async ()=>{
  try{
    await redisClient.connect();
    console.log("Successfully connected to redis.");
  }
  catch(error){
    console.log(error);
  }
}


module.exports = {redisClient, connectToRedis}