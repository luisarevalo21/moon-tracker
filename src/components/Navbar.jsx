import React from "react";

import { getDaysLeftTillFullMoon } from "../utilities/api";
const Navbar = ({ nextFullMoon }) => {
  const daysLeft = getDaysLeftTillFullMoon(nextFullMoon);
  const { day, monthNumber, year } = nextFullMoon;
  return (
    <div className="navbar">
      <h2>
        <span>🌕 </span>Moon Tracker
        <span> 🌑</span>
      </h2>
      <p>
        The next full moon will be: {monthNumber}/{day}/{year}
        🌕
      </p>
      <p>Only {daysLeft} days left till the next full moon 🌕</p>
    </div>
  );
};

export default Navbar;
