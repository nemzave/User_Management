import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/UserForm/:id" element={<UserForm />} />
        <Route path="/UserForm/new" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
