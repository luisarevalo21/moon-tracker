import React, { useState, useEffect } from "react";
import { fetchMoonData, fetchWeeklyMoonPhase } from "../utilities/api";
import { todaysDate } from "../utilities/date";
import MoonPhases from "./MoonPhases";
import Modal from "./Modal";

const MainImage = ({
  showModal,
  moon,
  closeModal,
  location,
  loadMoreMoonPhases,
  weekMoon,
  loadMore,
  geoLocation,
  errorOccured,
}) => {
  const loadMoreMoon = async () => {
    loadMoreMoonPhases();
  };

  const today = todaysDate();

  const imageLoading = (
    <div className="moon-location-details">
      <h2> Moon for {today} </h2>
      <p>
        Moon for {geoLocation}
        {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
      </p>
      <img src={moon?.imageUrl} alt="moon phase details" className="main-image" />
      {weekMoon.length === 0 || errorOccured !== "" ? (
        <button onClick={loadMoreMoon} className="load-more" disabled={loadMore}>
          Load more data...
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="moon-container">{imageLoading}</div>
    // <div className="moon-container">
    //   {imageLoading}
    //   <h3>Moon for the next 7 days</h3>
    //   {/* {weeklyMoon} */}
    //   <button onClick={loadMoreMoon} className="load-more">
    //     Load more data...
    //   </button>
    // </div>
  );
};

export default MainImage;
