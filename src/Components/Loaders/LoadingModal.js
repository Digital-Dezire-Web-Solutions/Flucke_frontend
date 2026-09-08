import React from "react";
import TruckLoading from "./TruckLoading";

const LoadingModal = ({ loadingtype }) => {
  return (
    <div className="admin-modal-overlay" >
      <div
        className="admin-modal"
        style={{ height: "auto", width: "auto",textAlign:"center" }}
      >
        {loadingtype === "truck" && <TruckLoading />}
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
