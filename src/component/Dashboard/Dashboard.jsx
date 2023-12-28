import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Management } from "../../Management";
import { Author } from "../Author/Author";
import { Generalbook } from "../GeneralBook/Generalbook";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (window.location.pathname) {
      case "/dashboard/management":
        return <Management />;
      case "/dashboard/author":
        return <Author />;
      case "/dashboard/general-book":
        return <Generalbook />;
      default:
        return (
          <div className="text-center text-2xl font-medium">
            No content available for: {window.location.pathname}
          </div>
        );
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingProcess />
      ) : (
        <div className="w-full h-screen flex">
          <div
            className={`${
              isSidebarOpen ? "w-[60%] sm:w-[20%]" : "w-[5%]"
            } transition-all duration-300 flex flex-col h-screen bg-neutral-300 bg-shadow-lg overflow-hidden`}
          >
            <button
              onClick={toggleSidebar}
              className={`text-gray-500 hover:text-gray-800 focus:outline-none p-3 text-xl  ${
                isSidebarOpen ? "bg-blue-200" : "bg-white"
              }`}
            >
              {isSidebarOpen ? "Close" : "Open"}
            </button>

            {isSidebarOpen && (
              <>
                <p className="my-3 text-center text-gray-800 text-4xl font-title font-bold">
                  Welcome Admin
                </p>

                <ul className="my-5 duration-300 whitespace-nowrap">
                  <li className="flex items-center justify-center">
                    <Link
                      to="/dashboard/management"
                      className={`${
                        window.location.pathname === "/dashboard/management"
                          ? "bg-gray-900 text-white"
                          : "bg-neutral-100"
                      } w-full h-[70px]  border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
                    >
                      Management
                    </Link>
                  </li>

                  <li className="flex items-center justify-center">
                    <Link
                      to="/dashboard/author"
                      className={`${
                        window.location.pathname === "/dashboard/author"
                          ? "bg-gray-900 text-white"
                          : "bg-neutral-100"
                      } w-full h-[70px] border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
                    >
                      Author
                    </Link>
                  </li>

                  <li className="flex items-center justify-center">
                    <Link
                      to="/dashboard/general-book"
                      className={`${
                        window.location.pathname === "/dashboard/general-book"
                          ? "bg-gray-900 text-white"
                          : "bg-neutral-100"
                      } w-full h-[70px]  border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
                    >
                      Books
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="flex-grow overflow-y-auto bg-neutral-200 w-[75%]">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};
