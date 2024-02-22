const { createClient } = require("redis");


require("dotenv").config();

const client = createClient({
    password: "",
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

const redisConnect = async () => {
    await client.connect();
    console.log("[redis] redis is connected");
};

module.exports = {
    redisConnect,
    client
};
