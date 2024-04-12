import "./App.css";
import AddData from "./assets/AddData";
import HomePage from "./assets/HomePage";
import UpdateData from "./assets/UpdateData";
import {  Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/add" element={<AddData />}></Route>
          <Route path="/update/:index" element={<UpdateData />}></Route>
        </Routes>
      </>
    </>
  );
}

export default App;
