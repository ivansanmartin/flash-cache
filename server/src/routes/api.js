const express = require("express");
const path = require("path")
const axios = require("axios");
const { redisConnect, client } = require("../database/connect-redis");

const router = express.Router();

redisConnect();
router.use(express.json());

router.get("/api/cache/", async (req, res) => {
    const caching = req.query.caching == "true" ? true : false
    const api = req.query.api
    const cacheName = req.query.cache_name

    let startTime = 0;
    let endTime = 0;
    let totalTime = 0;


    if (!caching) {
        startTime = Date.now();

        const response = await axios.get(api);

        endTime = Date.now();
        totalTime = endTime - startTime;

        await client.set(cacheName, JSON.stringify(response.data));
    
        return res.json({
            
            time_response: totalTime + "ms", 
            
            api_response: response.data});

    }

    startTime = Date.now();

    const reply = await client.get(cacheName);

    endTime = Date.now();
    totalTime = endTime - startTime;

    if (reply) {
        return res.json({
            time_response: totalTime + "ms",
            cache_response: JSON.parse(reply)
        });
    }

    startTime = Date.now()

    const response = await axios.get(api);

    endTime = Date.now()

    totalTime = endTime - startTime

    await client.set(cacheName, JSON.stringify(response.data));

    res.json({before_caching: true, time_response: totalTime + "ms", api_response: response.data});
});

module.exports = {
    api: router,
};
