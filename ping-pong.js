const express = require("express");

const PORT = 3001;

const app = express();

let count = 0;

app.get("/pingpong", (req, res) => {
    res.send(`pong ${count}`)
    count++;
})

app.listen(PORT);