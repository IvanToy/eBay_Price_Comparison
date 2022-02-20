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
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/ebayData");
      const data = await response.json();
      const finalData = [];

      for (let key in data) {
        finalData.push({ [key]: data[key] });
      }

      setEbayData(finalData);

      setIsLoading(false);
      setIsPosted(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPosted(false);
    }
  }, []);

  useEffect(() => {
    if (isPosted) {
      fetchData();
    }
  }, [fetchData, isPosted]);

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
        setIsPosted(true);
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
  if (ebayData.length > 0) {
    const [{ averagePrice }, { cheapestItem }, { expensiveItem }] = ebayData;
    const itemsArrays = [cheapestItem, expensiveItem];
    let price = averagePrice;

    content = <EbayList price={price} items={itemsArrays} />;
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
