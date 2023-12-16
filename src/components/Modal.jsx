import React from "react";

const Modal = ({ close }) => {
  return (
    <div className="modal-container">
      <h2 style={{ textAlign: "center" }}>Loading Moon data...</h2>
      <div className="loader"></div>

      <button onClick={close} className="close-btn">
        X
      </button>
    </div>
  );
};

export default Modal;
