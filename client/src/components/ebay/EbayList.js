import React from "react";
import EbayItem from "./EbayItem";

const EbayList = ({ price, items }) => {
  return (
    <div className="items-display-container">
      <h5 className="average-price">Average Price: ${price.toFixed(2)}</h5>
      <ul>
        {items.map((item) => (
          <EbayItem
            key={item._id}
            title={item.title}
            url={item.url}
            price={item.price}
          />
        ))}
      </ul>
    </div>
  );
};

export default EbayList;
