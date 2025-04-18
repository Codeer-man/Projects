// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <style>
        {`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 50vh;
          }
          
          .spinner-border {
            width: 3rem;
            height: 3rem;
            border: 0.25em solid #f3f3f3;
            border-top: 0.25em solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
