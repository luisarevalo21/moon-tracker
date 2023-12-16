import { isoDate } from "./date";
import { fullMoons } from "./fullMoon";
import moment from "moment";

const authString = btoa(`${import.meta.env.VITE_API_KEY}:${import.meta.env.VITE_SECRET_KEY}`);
const today = isoDate();
console.log("today is", today);
const moonObject = {
  format: "png",
  style: {
    moonStyle: "default",
    backgroundStyle: "stars",
    backgroundColor: "purple",
    headingColor: "white",
    textColor: "white",
  },
  observer: {
    latitude: 37.774929,
    longitude: -122.419418,
    date: today,
  },
  view: {
    type: "landscape-simple",
    orientation: "north-up",
  },
};
export async function fetchMoonData(location, moonData = moonObject) {
  const copy = { ...moonData };

  // console.log("copy", copy.observer.date);
  copy.observer.latitude = location.latitude;
  copy.observer.longitude = location.longitude;
  return fetch("https://api.astronomyapi.com/api/v2/studio/moon-phase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authString}`,
    },
    body: JSON.stringify(copy),
  })
    .then(res => res.json())
    .then(data => data.data)
    .catch(err => {
      throw new Error(err);
    });
}

function filterFullMoons() {
  const futureFullMoons = fullMoons.filter(fullMoon => {
    const fullMoonDate = moment({
      year: fullMoon.year,
      month: fullMoon.monthNumber - 1, // Month index starts from 0
      day: fullMoon.day,
    });

    return fullMoonDate.isAfter(today);
  });

  // Sort the future full moons by date
  futureFullMoons.sort((a, b) => {
    const dateA = moment({
      year: a.year,
      month: a.monthNumber - 1,
      day: a.day,
    });

    const dateB = moment({
      year: b.year,
      month: b.monthNumber - 1,
      day: b.day,
    });

    return dateA - dateB;
  });
  return futureFullMoons[0];
}

export function getDaysLeftTillFullMoon(nextFullMoon) {
  const [year, month, day] = today.split("-");

  const todayMoment = moment({
    year: year,
    month: Number(month) - 1,
    day: day,
  });
  const nextMoon = moment({
    year: nextFullMoon.year,
    month: nextFullMoon.monthNumber - 1,
    day: nextFullMoon.day,
  });
  return Math.abs(todayMoment.diff(nextMoon, "days"));
}

export function fetchNextFullMoon() {
  // Get the next full moon
  const nextFullMoon = filterFullMoons();
  return nextFullMoon;
}
async function generateNextWeek(location, date) {
  const today = moment(date);
  const moonImages = [];
  const moonDataCopy = { ...moonObject };
  for (let i = 0; i < 7; i++) {
    let copy = today.add(1, "day");
    moonDataCopy.observer.date = copy;
    // console.log("copy", copy.format("MM/DD/YYYY"));

    const res = await fetchMoonData(location, moonDataCopy);

    moonImages.push({ ...res, date: copy.format("MM/DD/YYYY"), location });
  }

  return moonImages;
}
export async function fetchWeeklyMoonPhase(location) {
  const moonImages = await generateNextWeek(location, today);

  return moonImages;
}

export function fetchReverseGeolocation(location) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }`
  )
    .then(res => res.json())
    .then(data => {
      return data.plus_code.compound_code.split(" ").slice(1).join(" ");
    });
}
