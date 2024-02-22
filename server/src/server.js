const express = require("express");
const path = require("path")
const server = express();
const { api } = require("./routes/api");

server.set("name", "bd-redis-cache");
server.set("port", "3000");

server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next()
})

server.use(api);

server.get("/", (req, res) => {
    res.send(
        `
            <h2>This simple API is for testing redis cache.</h2>

            <br />

            <h3>Remember that redis is an in-memory database hence the queries in db be faster</h3>

        `
    );

});

server.listen(server.get("port"));

console.log(
    `[starting] ${server.get("name")} is running on port ${server.get("port")}`
);
