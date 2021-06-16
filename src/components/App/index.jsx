import Home from "pages/Home";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "components/App/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App;
