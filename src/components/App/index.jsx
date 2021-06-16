import Main from "components/Main";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "components/App/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
