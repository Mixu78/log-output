const { randomUUID } = require("crypto");
const express = require("express");

const PORT = 3000;

const app = express();

const uuid = randomUUID();

let lastPrint = "";

const printUUID = () => {
	const date = new Date();
	lastPrint = `${date.toISOString()}: ${uuid}`;
	console.log(lastPrint);
	setTimeout(printUUID, 5000);
};

app.get("/status", (req, res) => {
	res.send(lastPrint);
})

printUUID();

app.listen(PORT);