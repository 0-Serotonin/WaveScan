import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import Image from "./Image";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />    
          <Route path="/image" element={<Image />} />
        </Routes>
      </div>
    </Router>
    
  )
}

export default App