import React from "react";

const Alert = ({ alertModal, closeAlert }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-modal">
        <div
          className={`custom-alert-icon custom-alert-icon--${alertModal.type}`}
        >
          {alertModal.type === "success" ? "✓" : "!"}
        </div>

        <h3>{alertModal.title}</h3>

        <p>{alertModal.message}</p>

        <button type="button" className="custom-alert-btn" onClick={closeAlert}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
