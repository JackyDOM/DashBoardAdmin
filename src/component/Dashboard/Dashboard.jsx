import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Management from "../management/Management";
import { Author } from "../Author/Author";
import { Generalbook } from "../GeneralBook/Generalbook";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";


export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStateChangedListener = (user) => {
      if (user) {
        const isAdminUser = user.email && user.email.includes("admin");
        setIsAdmin(isAdminUser);
        setIsLoading(false);

        if (!isAdminUser) {
          // User is not an admin, redirect to login page
          navigate("/login");
        }
      } else {
        // User is not authenticated, redirect to login page
        setIsAdmin(false);
        setIsLoading(false);
        navigate("/login");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, authStateChangedListener);

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    if (!isAdmin) {
      return <div className="text-center text-2xl font-medium">We Allow Only admin to access</div>;
    }

    switch (window.location.pathname) {
      case "/dashboard/management":
        return <Management />;
      case "/dashboard/author":
        return <Author />;
      case "/dashboard/book":
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
                <ul className="my-5 duration-300 whitespace-nowrap">
                  {isAdmin && (
                    <>
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
                          to="/dashboard/book"
                          className={`${
                            window.location.pathname === "/dashboard/book"
                              ? "bg-gray-900 text-white"
                              : "bg-neutral-100"
                          } w-full h-[70px]  border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
                        >
                          Books
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </>
            )}
          </div>
          <div className="flex-grow overflow-y-auto bg-neutral-200 w-[75%]">{renderContent()}</div>
        </div>
      )}
    </>
  );
};
