import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { main } from "./scraper.js";
import ebayData from "./db.js";

const app = express();
const port = 5000;

app.use(cors());
const corsOptions = {
	origin: "http://localhost:3000",
};
const configuredCors = cors(corsOptions);
app.options("*", configuredCors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/ebayData", configuredCors, async (req, res) => {
	try {
		const data = req.body;
		const query = data.inputText.split(" ")[0];
		console.log(data, query);
		await main(data.inputText);
		const scrapedData = await ebayData.find({ title: new RegExp(query, "ig") });
		console.log(scrapedData.length);
		const finalData = priceCalculations(scrapedData);
		res.send(finalData);
	} catch (error) {
		console.error(error);
	}
});

function priceCalculations(scrapedData) {
	let priceArray = [];
	scrapedData.forEach((item) => {
		if (item.price >= 100) priceArray.push(item.price);
	});
	const averagePrice =
		priceArray.reduce((sum, num) => sum + num) / priceArray.length;
	const maxPrice = Math.max(...priceArray);
	const minPrice = Math.min(...priceArray);

	const cheapestItem = scrapedData.find((item) => {
		if (item.price === minPrice) {
			return item;
		}
	});
	const expensiveItem = scrapedData.find((item) => {
		if (item.price === maxPrice) {
			return item;
		}
	});
	return {
		averagePrice,
		cheapItem: [cheapestItem],
		expensiveItem: [expensiveItem],
	};
}

app.listen(port, console.log(`Server is running on port ${port}`));
