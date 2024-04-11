import "../App.css";
import { Link } from "react-router-dom"
import MultiActionAreaCard from "../assets/Card";
function HomePage() {
  return (
    <>
      <h1 className="heading">ASAP Project - Autobiographies</h1>
      <img
        src="https://assets.gqindia.com/photos/6465b68b24a3886180dce767/master/pass/Best-autobiographies_hp.jpeg"
        alt=""
        className="generalimg"
      />
      <p className="intro">
        Dive into the fascinating stories of great leaders and discover how they
        navigated the twists and turns of life. Get ready for a motivational
        boost!
      </p>
      <br />
      <Link to="/add" className="button">
        Add Autobiography
      </Link>
      <div className="card">
        <MultiActionAreaCard />
      </div>
    </>
  );
}

export default HomePage;
