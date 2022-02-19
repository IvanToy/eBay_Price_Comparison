import React, { useRef, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const FormSubmitComponent = ({ onSubmitHandler, isLoading }) => {
  const inputRef = useRef(null);
  const [isInputValid, setIsInputValid] = useState(false);

  const onFocusHandler = () => {
    setIsInputValid(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const itemsName = inputRef.current.value;
    if (itemsName.trim().length === 0) {
      setIsInputValid(true);
      return;
    }
    onSubmitHandler(itemsName);
    inputRef.current.value = "";
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Form.Group controlId="forForm">
          <FormControl
            className={isInputValid ? "input-error" : "input"}
            ref={inputRef}
            type="text"
            placeholder="Enter item's name"
            onFocus={onFocusHandler}
          />
        </Form.Group>
        {isInputValid && <p className="error-input">Input must not be empty</p>}
        <Button disabled={isLoading ? true : false} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormSubmitComponent;
