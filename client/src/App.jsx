import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h1 className="heading">ASAP Project - Autobiographies</h1>
    <img src="https://assets.gqindia.com/photos/6465b68b24a3886180dce767/master/pass/Best-autobiographies_hp.jpeg" alt="" className="generalimg"/>
    <p className="intro">Dive into the fascinating stories of great leaders and discover how they navigated the twists and turns of life. Get ready for a motivational boost!</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className="countButton">
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
