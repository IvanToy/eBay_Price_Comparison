import mongoose from "mongoose";

async function connectMongoDb() {
	try {
		mongoose.connect("mongodb://localhost:27017/ebayDataDB", {
			useNewUrlParser: true,
		});
		console.log("Connect to mongodb");
	} catch (error) {
		throw new Error(error.message);
	}
}

export default connectMongoDb;
