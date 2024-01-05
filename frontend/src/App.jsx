import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import SignUp from "./components/Signup";
import TodoState from "./context/Todos/TodoState";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/Signup";
import Toast from "./components/Toaster";
import Footer from "./components/Footer";

function App() {
  return (
    <TodoState>
      <BrowserRouter>
        <Navbar />
        <Toast />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </TodoState>
  );
}

export default App;