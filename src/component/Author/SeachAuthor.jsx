import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const SearchAuthor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const searchAuthor = async () => {
      try {
        const authorsCollection = collection(db, "Author");
        const q = query(authorsCollection, where("authName", "==", searchQuery));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length === 1) {
          const author = querySnapshot.docs[0].data();
          setAuthorData(author);
        } else {
          setAuthorData(null);
        }
      } catch (error) {
        console.error("Error searching for author:", error.message);
      }
    };

    // Call the search function when the searchQuery changes
    searchAuthor();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-2">
      <div className="my-2 flex">
        <input
          type="text"
          placeholder="Search author"
          className="border p-2 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={() => SearchAuthor()}>
          Search
        </button>
      </div>

      {authorData ? (
        <div className="border p-2 mt-2 bg-white rounded-lg flex items-center">
          <img
            src={authorData.imgAuth}
            alt={authorData.authName}
            className="w-48 h-40 object-cover mb-2 rounded"
          />
          <div className="ml-4">
            <p className="text-lg font-bold">{authorData.authName}</p>
            <p className="text-sm">{authorData.Gender}</p>
            <p className="text-sm">{authorData.DOB}</p>
            {/* Add other fields as needed */}
          </div>
        </div>
      ) : (
        <p className="text-red-500"></p>
      )}
    </div>
  );
};

export default SearchAuthor;
