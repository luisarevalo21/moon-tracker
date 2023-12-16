import React from "react";

import { getDaysLeftTillFullMoon } from "../utilities/api";
const Navbar = nextFullMoon => {
  console.log("next full moon", nextFullMoon);
  const daysLeft = getDaysLeftTillFullMoon(nextFullMoon);
  const { day, monthNumber, year } = nextFullMoon;
  return (
    <div className="navbar">
      <h2>
        <span>🌕 </span>Moon Tracker
        <span> 🌑</span>
      </h2>
      <p>
        The next full moon will be:
        <span className="bold">
          {" "}
          {monthNumber}/{day}/{year}
        </span>{" "}
        🌕
      </p>
      <p>
        Only <span className="bold">{daysLeft}</span> days left till the next full moon 🌕
      </p>
    </div>
  );
};

export default Navbar;
