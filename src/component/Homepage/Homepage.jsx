import React, { useState, useEffect } from 'react';
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (you can replace this with your actual data fetching logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingProcess />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-200">
          <div className="text-4xl font-bold text-center hover:text-blue-500 transform hover:scale-105 transition-transform duration-300">
            WELCOME ADMIN DASHBOARD
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
