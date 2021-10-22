import React, { useEffect, useState } from "react";
import FormSubmit from "./components/FormSubmit";
import EbayDataList from "./components/EbayDataList";
function getSessionStorage(key, value) {
	const stored = window.sessionStorage.getItem(key);
	console.log(stored);
	if (!stored) {
		return value;
	}
	return JSON.parse(stored);
}
function App() {
	const [loading, setLoading] = useState(false);
	const [ebayData, setEbayData] = useState(getSessionStorage("data", []));

	function handleSubmit(e, inputText) {
		e.preventDefault();
		setLoading(true);

		fetch("http://localhost:5000/ebayData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inputText }),
		})
			.then((response) => response.json())
			.then((data) => {
				setEbayData(data);
				setLoading(false);
			});
	}

	useEffect(() => {
		sessionStorage.setItem("data", JSON.stringify(ebayData));
	}, [ebayData]);

	return (
		<section className="container-fluid">
			<h1>Ebay price comparison</h1>
			<div className="underline"></div>
			<FormSubmit handleSubmit={handleSubmit} />
			<EbayDataList ebayData={ebayData} loading={loading} />
		</section>
	);
}

export default App;
