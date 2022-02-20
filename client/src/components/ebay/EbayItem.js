import React from "react";

const EbayItem = ({ title, url, price }) => {
  let finalPrice = Number.isInteger(price) ? `$${price}.00` : `$${price}`;
  return (
    <li className="item-display">
      <a href={url} target="_blank" rel="noreferrer">
        <h5>{title}</h5>
        <h6>{finalPrice}</h6>
      </a>
    </li>
  );
};

export default EbayItem;
