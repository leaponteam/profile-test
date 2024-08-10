import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Profile";


function App() {
  return (
    <Router>
      <div>
      <p>Home</p>
        <Routes>
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
