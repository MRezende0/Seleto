import { createConnection } from "typeorm";

createConnection().catch((err) => {
	console.log("DATABASE CONNECTION FAILED", err);
});
