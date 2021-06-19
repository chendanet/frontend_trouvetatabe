import React, { useEffect, useState } from 'react'
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "components/App/index.css";
import { Provider } from 'react-redux'
import SignUp from "pages/SignUp";
import Booking from "pages/Booking";
import SignIn from "pages/SignIn";
import Venue from "pages/Venue";
import Profile from "pages/Profile";
import CreateVenue from "pages/CreateVenue"
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ListVenues from "pages/ListVenue";


const App = () => {

  const [venues, setVenues] = useState([]);

  const URL = "https://trouvetatableapi.herokuapp.com/api/venues";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data)
        console.log(data)
      });
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <ListVenues />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/venues" exact>
              <CreateVenue />
            </Route>
            <Route path="/venues/:idVenue" exact >
              <Venue venues={venues} />
            </Route>

            <Route path="/profile" exact>
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider >
  )
}
export default App;
