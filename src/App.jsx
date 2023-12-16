import Navbar from "./components/Navbar";
import MainImage from "./components/MainImage";
import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import MoonPhases from "./components/MoonPhases";
import Error from "./components/Error";

import {
  fetchMoonData,
  fetchWeeklyMoonPhase,
  fetchReverseGeolocation,
  fetchNextFullMoon,
  getDaysLeftTillFullMoon,
} from "./utilities/api";
//figure out how to hide key
//and run buod file automatically on render
//render a spinner when app is fetching location
//if error remove the spinner and display the issue
//host website
//
function App() {
  const [showModal, setShowModal] = useState(true);
  const [nextFullMoon, setNextFullMoon] = useState("");
  const [moon, setMoon] = useState([]);
  const [weekMoon, setWeekMoon] = useState([]);
  const [location, setLocation] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const [errorOccured, setErrorOccured] = useState("");

  // useEffect(() => {
  //   async function getLocationData() {
  //     setShowModal(true);

  //     await getLocation();
  //     setShowModal(false);
  //   }
  //   getLocationData();
  // }, []);

  useEffect(() => {
    getLocation();
    getNextFullMoon();
  }, []);

  function getNextFullMoon() {
    const res = fetchNextFullMoon();
    setNextFullMoon(res);
  }
  function getLocation() {
    if (navigator.geolocation) {
      setShowModal(true);

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("errror occured getting location");
      setShowModal(false);
    }
  }

  const loadMoreMoonPhases = async () => {
    setLoadMore(true);
    const res = await fetchWeeklyMoonPhase(location);

    setWeekMoon(res);
    setLoadMore(false);
  };

  const fetchMoon = async location => {
    setShowModal(true);
    try {
      const res = await fetchMoonData(location);
      setMoon(res);
      setShowModal(false);
    } catch (err) {
      console.log("res", err.message);
      setErrorOccured("error attempting to fetch try again later");
    }
  };

  const fetchGeoLocation = async location => {
    const res = await fetchReverseGeolocation(location);
    setGeoLocation(res);
  };
  const success = position => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setLocation(location);
    fetchMoon(location);
    fetchGeoLocation(location);
  };

  const error = () => {
    setErrorOccured("unable to retrive location, please allow location permission ");
    console.log("unable to retrieve location");
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };
  // const openModal = () => {
  //   // console.log("open modal called");
  //   setShowModal(true);
  // };

  // console.log("days", daysTillNextFullMoon);
  const showMoon = showModal ? (
    <Modal />
  ) : (
    <MainImage
      moon={moon}
      showModal={showModal}
      location={location}
      // openModal={openModal}
      // showModal={showModal}
      // closeModal={closeModal}
      // location={location}
      // moon={moon}'
      geoLocation={geoLocation}
      loadMore={loadMore}
      weekMoon={weekMoon}
      loadMoreMoonPhases={loadMoreMoonPhases}
      errorOccured={errorOccured}
    />
  );
  const moonPhases = loadMore ? (
    <Modal />
  ) : (
    <MoonPhases weekMoon={weekMoon} loadMore={loadMore} geoLocation={geoLocation} />
  );

  return (
    <>
      <Navbar nextFullMoon={nextFullMoon} />

      {errorOccured && <Error errorMessage={errorOccured} />}
      {!errorOccured && showMoon}
      {!errorOccured && moonPhases}
    </>
  );
}

export default App;
