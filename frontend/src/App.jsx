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
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

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
            <Route exact path="/forgot" element={<ForgotPassword />}></Route>
            <Route
              exact
              path="/reset-password/:id"
              element={<ResetPassword />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </TodoState>
  );
}

export default App;
