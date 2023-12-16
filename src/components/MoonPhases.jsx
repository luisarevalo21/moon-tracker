import React from "react";
import MoonItem from "./MoonItem";
import Modal from "./Modal";

const MoonPhases = ({ weekMoon, loadMore, geoLocation }) => {
  const moons = weekMoon.map(moon => (
    <MoonItem
      key={moon.date}
      date={moon.date}
      imageUrl={moon.imageUrl}
      location={moon.location}
      geoLocation={geoLocation}
    />
  ));
  return (
    <div className="moon-phases">
      {moons}
      {/* <div className="moon-location-details">
        <h2> Moon for {date} </h2>
        <p>
          Moon for {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}{" "}
        </p>
      </div>
      <img src={moon.imageUrl} alt="moon phase details" />
      <button onClick={loadMoreMoon}>Load more data...</button> */}
    </div>
  );
};

export default MoonPhases;
