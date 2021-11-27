import puppeteer from "puppeteer";
import cheerio from "cheerio";
import connectMongoDB from "./mongodbConnection.js";
import ebayData from "./db.js";

async function ebayScrape(browser, query) {
	try {
		const param = query.split(" ");
		const queryNew = param.length >= 2 ? param.join("+") : param[0];
		const page = await browser.newPage();
		for (let i = 1; i <= 3; i++) {
			await page.goto(
				`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${queryNew}&_sacat=0&_pgn=${i}`,
				{ waitUntil: "load", timeout: 0 }
			);

			const html = await page.content();
			const $ = cheerio.load(html);
			$(".s-item__info")
				.map((_, e) => {
					const titleElement = $(e).find(".s-item__link");
					const priceElement = $(e).find(".s-item__details");
					const title = $(titleElement).children().first().text();
					const url = $(titleElement).attr("href");
					const price = $(priceElement)
						.children()
						.first()
						.find(".s-item__price")
						.text();
					const arrayPrice = price.replace(/(\$|to|,)/g, "").split("  ");
					let priceFinal;
					if (arrayPrice[0] !== "") {
						priceFinal = arrayPrice.reduce(
							(sum, num) => parseFloat(sum) + parseFloat(num),
							0
						);
					}
					// console.log({ title, url, priceFinal });
					const ebayDataModel = new ebayData({ title, url, price: priceFinal });
					ebayDataModel.save();
				})
				.get();
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

async function main(query) {
	await connectMongoDB();
	console.time();
	const browser = await puppeteer.launch();
	await ebayScrape(browser, query);
	browser.close();
	console.timeEnd();
}

export default main;
