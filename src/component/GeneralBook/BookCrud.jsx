import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FcAddImage } from "react-icons/fc";
import { db, imgDB } from "../../firebase";
import { LoadingProcess } from "../LoadingProcess/LoadingProcess"; // Import the LoadingProcess component

export const BookCrud = () => {
  const [books, setBooks] = useState([]);
  const [Booktitle, setBooktitle] = useState("");
  const [Bookdesc, setBookdesc] = useState("");
  const [BookPrice, setBookPrice] = useState("");
  const [BookDate, setBookDate] = useState("");
  const [type, setType] = useState("");
  const [Stock, setStock] = useState(0);
  const [authorList, setAuthorList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [BookCover, setBookCover] = useState(null);
  const [BookPdf, setBookPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = collection(db, "books");
  const authorCollection = collection(db, "Author");

  const fetchAuthors = async () => {
    try {
      const authorsSnapshot = await getDocs(authorCollection);
      const authorsData = authorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAuthorList(authorsData);
    } catch (error) {
      console.error("Error fetching authors:", error.message);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddBook = async () => {
    if (!BookCover || !BookPdf || loading) return;
    setLoading(true);
    const imgRef = ref(imgDB, `/books/bookImage/${BookCover.name + uuidv4()}`);
    const pdfRef = ref(imgDB, `/books/bookPdf/${BookPdf.name + uuidv4()}`);

    try {
      // Upload image
      await uploadBytes(imgRef, BookCover);
      const imageUrl = await getDownloadURL(imgRef);

      // Upload PDF
      await uploadBytes(pdfRef, BookPdf);
      const pdfUrl = await getDownloadURL(pdfRef);
      await addDoc(value, {
        title: Booktitle,
        description: Bookdesc,
        price: BookPrice,
        date: BookDate,
        stock: Stock,
        image: imageUrl,
        bookPdf: pdfUrl,
        author: selectedAuthor,
        categories: type, // Add category fields
      });
      alert("Book data & Image Upload");

      // Reset form fields after successful upload
      setBooktitle("");
      setBookdesc("");
      setBookPrice("");
      setBookDate("");
      setStock(0);
      setType(""); // Reset category field
      setBookCover(null);
      setBookPdf(null);

      // Fetch updated books
      const booksCollection = await getDocs(value);
      setBooks(booksCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error uploading image or adding document:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col m-2 space-y-5">
      <h1 className="container text-2xl font-bold font-style hover:text-cyan-700">
        {"+ បញ្ចូលទិន្នន័យសៀវភៅ"}
      </h1>
      <input
        value={Booktitle}
        onChange={(e) => setBooktitle(e.target.value)}
        placeholder="ចំណងជើងសៀវភៅ"
        className="p-2 rounded-lg "
      />
      <input
        value={Bookdesc}
        onChange={(e) => setBookdesc(e.target.value)}
        placeholder="ព័ត៌មានរបស់សៀវភៅ"
        className="p-2 rounded-lg  border focus:outline-none focus:border-blue-500"
      />
      <input
        value={BookPrice}
        onChange={(e) => setBookPrice(parseInt(e.target.value, 10))}
        className="p-2 rounded-lg"
        placeholder="តម្លៃ សៀវភៅ"
      />
      <input
        value={BookDate}
        onChange={(e) => setBookDate(e.target.value)}
        className="p-2 rounded-lg"
        placeholder="ថ្ងៃ ខែ ឆ្នាំ ផលិត"
      />
      <input
        type="number" // Set the input type to number
        value={Stock}
        onChange={(e) => setStock(Math.max(0, parseInt(e.target.value, 10)))}
        className="p-2 rounded-lg"
        placeholder="ចំនួនស្តុក"
      />
      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="ប្រភេទសៀវភៅ"
        className="p-2 rounded-lg"
      />
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        className="p-2 rounded-lg"
      >
        <option value="">Select Author</option>
        {authorList.map((author) => (
          <option key={author.id} value={author.authName}>
            {author.authName}
          </option>
        ))}
      </select>
      <label className="relative overflow-hidden inline-block bg-white w-fit px-4 py-2 rounded-xl">
        <input
          type="file"
          onChange={(e) => setBookCover(e.target.files[0])}
          accept="image/*"
          className="font-[100px] absolute l-0 t-0 opacity-0"
        />
        <span className="flex text-xl font-bold font-style">
          <FcAddImage className="mt-1 mr-2" /> Upload Cover Book
        </span>
      </label>
      {BookCover && (
        <div className="flex items-center mt-2">
          <span className="text-green-500 mr-2">Image selected: {BookCover.name}</span>
          <button className="text-white p-2 bg-red-500 rounded-lg" onClick={() => setBookCover(null)}>
            Remove
          </button>
        </div>
      )}
      <label className="relative overflow-hidden inline-block bg-white w-fit px-4 py-2 rounded-xl">
        <input
          type="file"
          onChange={(e) => setBookPdf(e.target.files[0])}
          accept=".pdf"
          className="font-[100px] absolute l-0 t-0 opacity-0 "
        />
        <span className="flex text-xl font-bold font-style">
          <FcAddImage className="mt-1 mr-2" /> Upload Book PDF
        </span>
      </label>
      {BookPdf && (
        <div className="flex items-center mt-2">
          <span className="text-green-500 mr-2">PDF selected: {BookPdf.name}</span>
          <button className="text-white p-2 bg-red-500 rounded-lg" onClick={() => setBookPdf(null)}>
            Remove
          </button>
        </div>
      )}
      {loading && <LoadingProcess />}
      <button
        onClick={handleAddBook}
        className="bg-blue-500 w-32 rounded-xl p-2 text-white text-lg font-custom"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};
