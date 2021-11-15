const fs = require("fs");
const express = require("express");

const PORT = 3000;

const app = express();

const getStatus = () => {
	try {
		const hashStr = fs.readFileSync("./files/hash").toString();
		return hashStr;
	} catch {
		return "Could not read hash";
	}
}

app.get("/status", (req, res) => {
	res.send(getStatus());
})

app.listen(PORT);