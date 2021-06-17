import Home from "pages/Home";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "components/App/index.css";
import { Provider } from 'react-redux'
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'store';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>

          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider >


  )
}

export default App;
