import "./App.css";
import AddData from "./assets/AddData";
import HomePage from "./assets/HomePage";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import UpdateData from "./assets/UpdateData";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/home/add" element={<AddData />}></Route>
          <Route path="/home/update/:index" element={<UpdateData />}></Route>
        </Routes>
      </>
    </>
  );
}

export default App;
