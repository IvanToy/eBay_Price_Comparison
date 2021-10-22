import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
	title: String,
	url: String,
	price: Number,
});

const ebayData = mongoose.model("ebayData", dataSchema);

export default ebayData;
