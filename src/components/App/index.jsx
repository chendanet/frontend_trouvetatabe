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
import { ListVenues } from "pages/ListVenue";
import MyVenues from 'pages/MyVenues';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Ratings from 'pages/Ratings';
import Blog from 'pages/Blog';



const App = () => {


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
              <Venue />
            </Route>
            <Route path="/myVenues" exact>
              <MyVenues />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/password/forgot">
              <ForgotPassword />
            </Route>
            <Route path="/password/reset/:token">
              <ResetPassword />
            </Route>
            <Route path="/ratings">
              <Ratings />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider >
  )
}
export default App;
