import Main from "../main/Main";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./App.css";
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
