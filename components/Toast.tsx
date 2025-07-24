"use client";

import React, { useState } from "react";

export default function Toast() {
  const [show, setShow] = useState(false);

  const handleToast = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000); 
  };

  return (
    <>
      <button
        onClick={handleToast}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Show Toast
      </button>

      {show && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          ✅ Startup created successfully!
        </div>
      )}
    </>
  );
}
