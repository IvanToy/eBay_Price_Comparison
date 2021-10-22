import React from "react";
import { Spinner } from "react-bootstrap";

const EbayDataList = ({ ebayData, loading }) => {
	return (
		<section style={{ marginTop: "8rem", height: "400px" }}>
			{loading ? (
				<Spinner
					style={{
						width: "100px",
						height: "100px",
						margin: "auto",
						display: "block",
					}}
					variant="primary"
					animation="border"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : ebayData.length === 0 ? (
				""
			) : (
				<section className="container itemsDisplayContainer">
					<h2>The average price is : ${ebayData.averagePrice.toFixed(2)}</h2>
					<div className="itemsDisplay">
						<h2>The most expensive item</h2>
						{ebayData.expensiveItem.map((item) => {
							return (
								<ul key={item._id}>
									<a href={item.url} rel="noreferrer" target="_blank">
										<li>
											<h6>{item.title}</h6>
										</li>
									</a>
									<li>
										$
										{Number.isInteger(item.price)
											? `${item.price}.00`
											: item.price}
									</li>
								</ul>
							);
						})}
					</div>
					<div className="itemsDisplay">
						<h2>The cheapest item</h2>
						{ebayData.cheapItem.map((item) => {
							return (
								<ul key={item._id}>
									<a href={item.url} rel="noreferrer" target="_blank">
										<li>
											<h6>{item.title}</h6>
										</li>
									</a>
									<li>
										$
										{Number.isInteger(item.price)
											? `${item.price}.00`
											: item.price}
									</li>
								</ul>
							);
						})}
					</div>
				</section>
			)}
		</section>
	);
};
export default EbayDataList;
