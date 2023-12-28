import { useState, useEffect } from "react";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

const Management = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
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
};

export default Management;
