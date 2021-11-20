const fs = require("fs");
const express = require("express");

const PORT = 3001;

const app = express();

let count = 0;

app.get("/pingpong", (req, res) => {
	count++;
	res.send(`pong ${count}`)
})

app.get("/status", (req, res) => {
	res.send(count.toString());
})

app.listen(PORT);