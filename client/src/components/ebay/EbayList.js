import React from "react";
import EbayItem from "./EbayItem";

const EbayList = ({ ebayData }) => {
	return (
		<div className="itemsDisplayContainer">
			<h5 className="averagePrice">
				Average Price: ${ebayData[0].averagePrice.toFixed(2)}
			</h5>
			<ul className="itemsDisplay">
				{ebayData[0].expensiveItem.map((item) => (
					<EbayItem
						key={item._id}
						title={item.title}
						price={item.price}
						url={item.url}
					/>
				))}
			</ul>
			<ul className="itemsDisplay">
				{ebayData[0].cheapItem.map((item) => (
					<EbayItem
						key={item._id}
						title={item.title}
						price={item.price}
						url={item.url}
					/>
				))}
			</ul>
		</div>
	);
};

export default EbayList;
