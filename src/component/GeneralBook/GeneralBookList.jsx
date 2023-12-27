import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, imgDB } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess";
import { FaRegFilePdf } from "react-icons/fa";

export const GeneralBookList = () => {
  const [updatingData, setUpdatingData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [NovelBook, setNovelBook] = useState([]);
  const [selectBook, setSelectBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [bookImage, setBookImage] = useState(null);
  const [bookDetailModalOpen, setBookDetailModalOpen] = useState(false);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateSuccessPopup, setUpdateSuccessPopup] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    price: "",
    description: "",
    author: "",
    image: "",
  });

  const handleSearch = (results) => {
    setSearchResults(results);
    setHoveredBook(null);
    setIsSearchActive(results.length > 0);
  };

  const handleBookDetail = (bookId) => {
    const selectedBook = NovelBook.find((book) => book.id === bookId);
    setUpdatedBook(selectedBook);
    setBookDetailModalOpen(true);
  };

  const handleDelete = (book) => {
    if (loading) return;
    setSelectBook({ book });
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      if (!selectBook) {
        throw new Error("Selected book is undefined");
      }
      const bookRef = doc(db, "books", selectBook.book);
      await deleteDoc(bookRef);
  
      // Update NovelBook state after successful deletion
      setNovelBook((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectBook.book)
      );
  
      setShowSuccessPopup(true);
      alert("Delete Successful!!");
    } catch (error) {
      console.error("Error deleting document or image:", error.message);
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
    }
  };
  

  const handleUpdate = (book) => {
    setUpdatedBook(book);
    setUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const bookRef = doc(db, "books", updatedBook.id);
      const newData = {
        title: updatedBook.title,
        price: parseInt(updatedBook.price, 10),
        author: updatedBook.author,
        image: updatedBook.image,
      };
  
      if (bookImage) {
        const newImgRef = ref(
          imgDB,
          `WebsiteProject/books/${bookImage.name + uuidv4()}`
        );
        await uploadBytes(newImgRef, bookImage);
        const newImgUrl = await getDownloadURL(newImgRef);
        newData.img = newImgUrl;
      }
  
      await updateDoc(bookRef, newData);
  
      // Update NovelBook state after successful update
      setNovelBook((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? { ...book, ...newData } : book
        )
      );
  
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating document or image:", error.message);
    } finally {
      setLoading(false);
      setUpdatingData(false);
      setUpdateModalOpen(false);
    }
  };
  

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contain = collection(db, "books");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));

        // Filter data based on the selected category
        const filteredData = selectedCategory
          ? data.filter((item) => item.categories === selectedCategory)
          : data;

        setNovelBook(filteredData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [selectedCategory, updateSuccessPopup, updateSuccess]);

  return (
    <section key={selectedCategory}>
      <div className="container w-auto">
        {/* Add the category filter dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Filter by Category:
          </label>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">All Categories</option>
            {/* Add options dynamically based on unique categories in NovelBook */}
            {[...new Set(NovelBook.map((item) => item.categories))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
        {(isSearchActive ? searchResults : NovelBook).map((item, index) => (
          <div
            key={item.id}
            className={`flex w-full items-center mb-2 p-4 rounded-lg ${
              hoveredBook === item.id ? "bg-blue-200" : "bg-white"
            } ${isSearchActive ? "hidden" : ""}`}
            onMouseEnter={() => setHoveredBook(item.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <img
              src={item.image}
              alt={`Novel-${index}`}
              className="w-[200px] h-[200px]"
            />
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col ml-7 text-lg font-bold space-y-4">
                <h1>{item.title}</h1>
                <h3>{item.price}</h3>
                <h3>{item.stock} ក្បាល</h3>
                <h3>{item.categories}</h3>
                <span>{item.author}</span>
              </div>

              <div className="h-fit space-x-2 whitespace-nowrap ">
                <button
                  className="bg-red-500 text-white active:bg-blue-500 p-2 rounded-xl"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white p-2 active:bg-blue-500 rounded-xl"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className="bg-gray-900 text-white p-2 active:bg-blue-500 rounded-xl "
                  onClick={() => handleBookDetail(item.id)}
                >
                  Author Detail
                </button>
              </div>
            </div>
          </div>
        ))}
         {loading && showSuccessPopup && <LoadingProcess />}
        {openDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={() => setOpenDeleteModal(false)}
            ></div>
            <div className="bg-white p-4 rounded-lg z-10">
              <p className="text-lg font-semibold mb-4">Confirm Delete</p>
              <p>Are you sure you want to delete this book?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 bg-red-500 text-white p-2 rounded"
                  onClick={() => {
                    confirmDelete();
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        <div
          className={`fixed inset-0 z-30 ${
            updateModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Update Book</h2>

              {/* Update input fields to allow user input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={updatedBook.title}
                  onChange={(e) =>
                    setUpdatedBook({ ...updatedBook, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={updatedBook.price}
                  onChange={(e) =>
                    setUpdatedBook({ ...updatedBook, price: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={updatedBook.description}
                  onChange={(e) =>
                    setUpdatedBook({
                      ...updatedBook,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Add more input fields for other properties like authorId, img, etc. */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Image (leave empty to keep the existing image)
                </label>
                <input
                  type="file"
                  onChange={(e) => setBookImage(e.target.files[0])}
                  accept="image/*"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-2 bg-green-500 text-white p-2 rounded"
                  onClick={() => confirmUpdate()}
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setUpdateModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Process during Update */}
        {loading && showSuccessPopup && updateSuccess && updateModalOpen && !updatingData ? (
          <LoadingProcess />
        ) : null}
        {/* Update Success Modal */}
        {updateSuccessPopup && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center ">
                <div className="bg-white p-4 rounded shadow-lg">
                  <p className="mb-4">Update successful!</p>
                  <button
                    className="bg-gray-500 text-white p-2 rounded"
                    onClick={() => setUpdateSuccessPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Show Book Detail */}
        <div
          className={`fixed inset-0 z-50 ${
            bookDetailModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50 "></div>
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="flex bg-white p-4 rounded shadow-xl mb-2 ">
              <div className="w-[50%] flex flex-col items-center justify-center">
                <img
                  src={updatedBook.image}
                  className="w-[500px] h-[500px] border-2 "
                  alt={updatedBook.title}
                />
                {updatedBook.bookPdf && (
                  <a
                    href={updatedBook.bookPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex text-xl font-bold text-red-600 ml-4">
                      <p className="flex">View PDF</p>
                      <FaRegFilePdf className="flex mt-1" />
                    </button>
                  </a>
                )}
              </div>
              <div className="flex flex-col w-[50%] h-auto">
                <h2 className="flex text-2xl font-bold mb-4">Book Detail</h2>
                <p className="flex text-xl font-bold">
                  Title:
                  <p className="flex ml-4 text-gray-700 hover:text-sky-800">
                    {" "}
                    {updatedBook.title}
                  </p>
                </p>
                <p className="flex text-xl font-bold">
                  Price:{" "}
                  <p className="flex ml-4 text-gray-700">{updatedBook.price}</p>
                </p>
                <p className="flex text-xl font-bold">
                  Description:{" "}
                  <p className="flex ml-4 text-gray-700 text-lg subpixel-antialiased ">
                    {updatedBook.description}
                  </p>
                </p>
                <h3>{updatedBook.type}</h3>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-800"
                    onClick={() => setBookDetailModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
