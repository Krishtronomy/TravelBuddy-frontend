import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Travels from "./pages/Travels";
import Profile from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import AppCss from "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navigation />
          <Routes>
            <Route exact path="pages/home" element={<Home />} />
            <Route path="pages/explore" element={<Explore />} />
            <Route path="pages/travels" element={<Travels />} />
            <Route path="pages/profile" element={<Profile />} />
            <Route path="pages/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
