import React, {useReducer} from "react";
import { Navbar } from "./components";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, Explore, Travels, Profile, Login } from "./pages";
import TravelPostDetails from "./pages/Travels/TravelPostDetails";
import "./App.scss";
import { reducer } from "./utils/reducer";
import { StateContext } from "./utils/stateContext";

const App = () => {

  const initialState = {
    id: sessionStorage.getItem("id"),
    loggedInUser: sessionStorage.getItem("user") || null,
    token: sessionStorage.getItem("token") || null,
    imageUrl: sessionStorage.getItem("imageUrl"),
    about: sessionStorage.getItem("about"),
    postsList: []
  }
  const [store, dispatch] = useReducer(reducer, initialState)
  return (
    
    <div className="app">
      {/* Set Global Context and pass store and dispatch as props */}
      <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <Navbar />
        <Home />
        <Explore />
        <Travels />
        <Routes>
          <Route exact path="/posts/:id" element={<TravelPostDetails />} />
        </Routes>
        <Profile />
        <Login />
      </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
