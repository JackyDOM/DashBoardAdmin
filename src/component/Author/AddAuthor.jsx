import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, imgDB } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FcAddImage } from "react-icons/fc";

export const AddAuthor = () => {
  const [authName, setAuthName] = useState("");
  const [authDecs, setAuthDecs] = useState("");
  const [authGender, setAuthGender] = useState("");
  const [authDOB, setAuthDOB] = useState("");
  const [authImage, setAuthImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
  const [loading, setLoading] = useState(false);

  const value = collection(db, "Author");

  const handleCreate = async () => {
    if (!authImage || loading) return;
    setLoading(true);
    const imgRef = ref(imgDB, `WebsiteProject/AboutUs/${authImage.name + uuidv4()}`);
    try {
      await uploadBytes(imgRef, authImage);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url); // Set the image URL
      await addDoc(value, {
        authName,
        Decs: authDecs,
        Gender: authGender,
        DOB: authDOB,
        imgAuth: url,
      });

      alert("Author data & Image Upload");
    } catch (error) {
      console.error("Error uploading image or adding document:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container flex flex-col m-2 space-y-5">
      <input
        value={authName}
        onChange={(e) => setAuthName(e.target.value)}
        placeholder="ឈ្មោះ អ្នកនិពន្ធ"
        className="p-2 "
      />
      <input
        value={authDecs}
        onChange={(e) => setAuthDecs(e.target.value)}
        placeholder="ព័ត៌មានរបស់អ្នកនិពន្ធ"
        className="p-2 "
      />
      <input
        value={authGender}
        onChange={(e) => setAuthGender(e.target.value)}
        className="p-2"
        placeholder="ភេទ"
      />
      <input
        value={authDOB}
        onChange={(e) => setAuthDOB(e.target.value)}
        className="p-2"
        placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត"
      />
      <label className="relative overflow-hidden inline-block bg-white w-fit px-10 py-4">
        <input
          type="file"
          onChange={(e) => setAuthImage(e.target.files[0])}
          accept="image/*"
          className="font-[100px] absolute l-0 t-0 opacity-0"
        />
        <span className="flex text-3xl ">
          <FcAddImage className="mt-1 mr-2" /> Upload Image (4 x 6)
        </span>
      </label>
      <button onClick={handleCreate} className="bg-blue-500 w-32 rounded-lg p-2 text-white">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};
