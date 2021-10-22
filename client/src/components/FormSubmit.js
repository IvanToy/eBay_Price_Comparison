import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const FormSubmit = ({ handleSubmit }) => {
	const [inputText, setInputText] = useState("");
	return (
		<Form>
			<Form.Group className="mb-3 mt-3" controlId="forFormGroup">
				<FormControl
					style={{ width: "50%", margin: "0 auto 0" }}
					type="text"
					value={inputText}
					placeholder="Enter a product's name"
					onChange={(e) => setInputText(e.target.value)}
				/>
			</Form.Group>
			<Button
				type="submit"
				onClick={(e) => {
					handleSubmit(e, inputText);
					setInputText("");
				}}
			>
				Submit
			</Button>
		</Form>
	);
};

export default FormSubmit;
