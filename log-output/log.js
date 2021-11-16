const fs = require("fs");
const express = require("express");

const PORT = 3000;

const app = express();

const getStatus = () => {
	try {
		const hashStr = fs.readFileSync("./files/hash").toString();
		const pongs = fs.readFileSync("./files/pingpong").toString();
		return `${hashStr}\nPings / Pongs: ${pongs}`;
	} catch (e) {
		console.warn(e);
		return "Could not read hash";
	}
}

app.get("/status", (req, res) => {
	res.send(getStatus().replace("\n", "<br>"));
})

app.listen(PORT);