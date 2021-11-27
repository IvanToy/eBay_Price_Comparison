import express from "express";
import cors from "cors";
import main from "./scraper.js";
import calculatedPrices from "./calculations.js";

const app = express();
const port = 5000;

app.use(cors());
const corsOptions = {
	origin: "http://localhost:3000",
};
const configuredCors = cors(corsOptions);
app.options("*", configuredCors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let q = [];

app.get("/ebayData", async (req, res) => {
	try {
		const itemsName = q[q.length - 1];
		const result = await calculatedPrices(itemsName);
		res.send(result);
	} catch (error) {
		console.error(error);
	}
});

app.post("/ebayData", configuredCors, async (req, res) => {
	try {
		const data = req.body;
		q.push(data.itemsName);
		await main(data.itemsName);
		res.send({ message: "Posted" });
	} catch (error) {
		console.error(error);
	}
});

app.listen(port, console.log(`Server is running on port ${port}`));
