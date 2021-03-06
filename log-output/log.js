const fs = require("fs");
const express = require("express");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3000;

const app = express();

const getStatus = async () => {
	try {
		const message = process.env.MESSAGE || "No message set :(";
		const hashStr = fs.readFileSync("./files/hash").toString();
		const pongs = await axios
			.get("http://ping-pong.log-output.svc.cluster.local:80/status")
			.then((res) => res.data);
		return `${message}\n${hashStr}\nPings / Pongs: ${pongs}`;
	} catch (e) {
		console.warn(e);
		return "Could not read hash";
	}
};

app.get("/healthz", (req, res) => {
	axios
		.get("http://ping-pong.log-output.svc.cluster.local:80/healthz")
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(500));
});

app.get("/status", async (req, res) => {
	res.send((await getStatus()).replace(/\n/g, "<br>"));
});

app.listen(PORT);
