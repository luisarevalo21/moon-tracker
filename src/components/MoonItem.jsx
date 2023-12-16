import React from "react";

const MoonItem = ({ date, location, imageUrl, geoLocation }) => {
  return (
    <div className="moon-item" key={date}>
      <div className="moon-item-details">
        <h2> Moon for {date} </h2>
        <p>Moon for {geoLocation}</p>
      </div>
      <img src={imageUrl} alt="moon phase details" />
    </div>
  );
};

export default MoonItem;
