import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="error">
      <h3>{errorMessage}</h3>
    </div>
  );
};

export default Error;
