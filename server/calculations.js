import connectMongoDb from "./mongodbConnection.js";
import ebayData from "./db.js";

export default async function calculatedPrices(itemsName) {
  await connectMongoDb();
  const query = itemsName.split(" ")[0];
  console.log(query);
  const pattern = new RegExp(query, "ig");
  const data = await ebayData.find({ title: pattern });
  const result = calculatePrices(data);

  return result;
}

function calculatePrices(data) {
  let priceArray = [];
  data.forEach((item) => {
    if (item.price >= 100) priceArray.push(item.price);
  });
  const averagePrice =
    priceArray.reduce((sum, num) => sum + num) / priceArray.length;
  const maxPrice = Math.max(...priceArray);
  const minPrice = Math.min(...priceArray);
  const cheapestItem = data.find((item) => {
    if (item.price === minPrice) {
      return item;
    }
  });
  const expensiveItem = data.find((item) => {
    if (item.price === maxPrice) {
      return item;
    }
  });
  return {
    averagePrice,
    cheapItem: cheapestItem,
    expensiveItem: expensiveItem,
  };
}
