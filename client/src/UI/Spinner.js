import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
	return (
		<>
			<p>Loading...</p>
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
		</>
	);
};

export default SpinnerComponent;
