import React, { useCallback, useEffect, useState } from "react";
import EbayList from "./components/ebay/EbayList";
import FormSubmitComponent from "./components/FormSubmitComponent";
import SpinnerComponent from "./UI/Spinner";

function getSessionStorage(key, value) {
	const stored = sessionStorage.getItem(key);
	if (!stored) {
		return value;
	}
	return JSON.parse(stored);
}

function App() {
	const [ebayData, setEbayData] = useState(getSessionStorage("data", []));
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("http://localhost:5000/ebayData");
			const data = await response.json();

			setEbayData(data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		sessionStorage.setItem("data", JSON.stringify(ebayData));
	}, [ebayData]);

	const onSubmitHandler = async (itemsName) => {
		setIsLoading(true);
		try {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemsName }),
			};
			const response = await fetch("http://localhost:5000/ebayData", options);

			const data = await response.json();
			if (data.message === "Posted") {
				fetchData();
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	let content;

	if (ebayData.length === 0) {
		content = <p>Search for a product.</p>;
	}
	if (Object.keys(ebayData).length > 0) {
		content = <EbayList ebayData={ebayData} />;
	}

	if (isLoading) {
		content = <SpinnerComponent />;
	}
	return (
		<div className="container-fluid">
			<h1>Ebay Price Comparison</h1>
			<div className="underline"></div>
			<FormSubmitComponent
				isLoading={isLoading}
				onSubmitHandler={onSubmitHandler}
			/>
			{content}
		</div>
	);
}

export default App;
