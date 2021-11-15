const fs = require("fs");
const express = require("express");

const PORT = 3001;

const app = express();

let count = 0;

app.get("/pingpong", (req, res) => {
    res.send(`pong ${count}`)
    count++;
    try {
        fs.writeFileSync("./files/pingpong", count.toString());
    } catch {
        console.warn("Failed to write pingpong count!");
    }
})

app.listen(PORT);