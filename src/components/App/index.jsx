import React, { useEffect, useState } from 'react'
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "components/App/index.css";
import { Provider } from 'react-redux'
import SignUp from "pages/SignUp";
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
import MyVenues from 'pages/MyVenues';
import Booking from "pages/Booking";
import { PROD_EDIT_VENUE } from 'api/apiHandler';


const App = () => {

  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch(PROD_EDIT_VENUE)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data)
      });
  }, [venues])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <ListVenues venues={venues} />
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
            <Route path="/myVenues" exact>
              <MyVenues venues={venues} />
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
