import React, { useState } from "react";
import { BookCrud } from "./BookCrud";
import { GeneralBookList } from "./GeneralBookList";

export const Generalbook = () => {
  const [book, setBook] = useState([
    { id: 1, name: "View-Book" },
    { id: 2, name: "Add Book" },
  ]);
  const [activeComponent, setActiveComponent] = useState("View-Book");
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };
  const renderContent = () => {
    switch (activeComponent) {
      case "View-Book":
        return <GeneralBookList />;
      case "Add Book":
        return <BookCrud />;
      default:
        return (
          <div className="text-center text-2xl font-medium ">
            No content available for : {activeComponent}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <ul className="flex items-center justify-center bg-shadow-lg py-3 bg-white ">
        {book.map((books) => (
          <li
            key={books.id}
            className="hover:scale-110 transition duration-150 ease-in-out whitespace-nowrap"
          >
            <span
              className={`${
                activeComponent === books.name
                  ? " hover:bg-shadow-xl text-gray-700"
                  : "text-gray-400 hover:underline hover:text-gray-700 hover:bg-gray-100 hover:rounded-lg hover:bg-shadow-xl"
              } cursor-pointer font-navbar font-bold text-center text-2xl p-2 hover:bg-shadow-xl text-gray-200`}
              onClick={() => handleComponentChange(books.name)}
            >
              {books.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Content Section */}
      <div className="flex-grow bg-neutral-200 px-4 py-3 transition duration-150 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};
