import "../App.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiActionAreaCard from "../assets/Card";
import axios from "axios";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [autobiographies, setAutobiographies] = useState([]);
  const [filteredAutobiographies, setFilteredAutobiographies] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get("http://localhost:3000/users");
        setUsers(usersResponse.data);

        const autobioResponse = await axios.get("http://localhost:3000/getdata");
        setAutobiographies(autobioResponse.data.arr);
        setFilteredAutobiographies(autobioResponse.data.arr);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  // Handle user selection from dropdown
  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    if (userId === "") {
      setFilteredAutobiographies(autobiographies);
    } else {
      if (users.find(user => user._id === userId)?.name === "Ramaa") {
        // If the selected user is "Ramaa," randomly select a subset of autobiographies
        const shuffledAutobios = autobiographies.sort(() => Math.random() - 0.5);
        const randomAutobios = shuffledAutobios.slice(0, 3); // Adjust the number as needed
        setFilteredAutobiographies(randomAutobios);
      } else {
        const userAutobiographies = autobiographies.filter(
          (autobio) => autobio.user === userId
        );
        setFilteredAutobiographies(userAutobiographies);
      }
    }
  };

  // Logout functionality
  const Logout = () => {
    document.cookie = "gmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/");
  };

  return (
    <>
      <div className="top-right">
        <Link to="/" className="logout-link" onClick={Logout}>
          Logout
        </Link>
      </div>
      <h1 className="heading">
        <span className="rainbow-text">MERN</span>{" "}
        <span className="rainbow-text-loop">Milestone</span> -{" "}
        <span className="glow-text">Autobiographies</span>
      </h1>
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
      <Link to="/home/add" className="button">
        Add Autobiography
      </Link>

      <div className="dropdown-container">
        <label htmlFor="userDropdown">Filter by user: </label>
        <select id="userDropdown" onChange={handleUserChange} value={selectedUser}>
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        {filteredAutobiographies.length > 0 ? (
          filteredAutobiographies.map((autobio) => (
            <MultiActionAreaCard key={autobio._id} autobio={autobio} />
          ))
        ) : (
          <p>This user has not done any activity</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
