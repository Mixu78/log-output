const { randomUUID } = require("crypto");
const fs = require("fs");

const uuid = randomUUID();

let lastPrint = "";

const printUUID = () => {
	const date = new Date();
	lastPrint = `${date.toISOString()}: ${uuid}`;
	setTimeout(printUUID, 5000);
    try {
        fs.writeFileSync("./files/hash", lastPrint);
    } catch (e) {
        console.warn(`Failed to write hash!`);
        console.warn(e);
    }
};

printUUID();