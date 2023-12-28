import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./component/Homepage/Homepage";
import { Navbar } from "./Navbar";
import { Dashboard } from "./component/Dashboard/Dashboard";
import { Account } from "./component/account/Account";
import { AddAuthor } from "./component/Author/AddAuthor";
import { AuthorList } from "./component/Author/AuthorList";
import Login from "./features/auth/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/inputauthor" element={<AddAuthor />} />
          <Route path="/dashboard/author/list" element={<AuthorList />} />
          <Route path="/login" element={<Login />}/>
          {/* <Route path="/das" */}
          {/* Add more routes for other components */}
          {/* ... (more routes) */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
