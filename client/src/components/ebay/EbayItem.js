import React from "react";

const EbayItem = ({ title, price, url }) => {
	return (
		<a href={url} target="_blank" rel="noreferrer">
			<li>
				<h5>{title}</h5>
				<h6>{price}</h6>
			</li>
		</a>
	);
};

export default EbayItem;
