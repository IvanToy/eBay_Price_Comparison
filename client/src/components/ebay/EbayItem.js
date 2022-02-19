import React from "react";

const EbayItem = ({ title, url, price }) => {
  return (
    <li className="item-display">
      <a href={url} target="_blank" rel="noreferrer">
        <h5>{title}</h5>
        <h6>${price}.00</h6>
      </a>
    </li>
  );
};

export default EbayItem;
