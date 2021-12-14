const express = require("express");
const { Pool, PoolClient } = require("pg");

const PORT = process.env.PORT || 3001;

const pool = new Pool({
	host: process.env.POSTGRES_HOST || "localhost",
	user: process.env.POSTGRES_USER || "kubernetes",
	database: process.env.POSTGRES_DB || "ping-pong",
	password: process.env.POSTGRES_PASSWORD || "kubernetes",
});

const app = express();

let count = 0;

/**@param {PoolClient} client */
const initDB = (client) =>
	client
		.query(
			`CREATE TABLE IF NOT EXISTS pongs
(
    id serial NOT NULL,
    count integer NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
)`
		)
		.then(() => client.query("SELECT count FROM pongs WHERE id = 0"))
		.then(async (res) => {
			if (res.rows.length > 0) {
				return (count = res.rows[0].count);
			}
			return await client.query("INSERT INTO pongs VALUES(0)");
		})
		.finally(() => client.release());

app.get("/pingpong", (req, res) => {
	pool.connect().then((client) =>
		client
			.query("UPDATE pongs SET count = $1 WHERE id = 0", [count + 1])
			.then(() => {
				count++;
				res.send(`pong ${count}`);
			})
			.catch(console.warn)
			.finally(() => client.release())
	);
});

app.get("/healthz", (req, res) => {
	pool.connect()
		.then((c) => {
			res.sendStatus(200);
			c.release();
		})
		.catch(() => res.sendStatus(500));
});

app.get("/status", (req, res) => {
	res.send(count.toString());
});

const start = () =>
	pool
		.connect()
		.then(async (client) => {
			console.log("Connected to database");
			await initDB(client);
			app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
		})
		.catch((err) => {
			console.warn("Error while connecting to database, retrying");
			console.warn(err);
			setTimeout(start, 1000);
		});
start();
