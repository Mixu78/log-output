const fs = require("fs");
const express = require("express");
const { default: axios } = require("axios");


const PORT = 3000;

const app = express();

const getStatus = async () => {
	try {
		const hashStr = fs.readFileSync("./files/hash").toString();
		const pongs = await axios.get("http://ping-pong:2223/status").then(res => res.data);
		return `${hashStr}\nPings / Pongs: ${pongs}`;
	} catch (e) {
		console.warn(e);
		return "Could not read hash";
	}
}

app.get("/status", async (req, res) => {
	res.send((await getStatus()).replace("\n", "<br>"));
})

app.listen(PORT);