import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    if (user) {
      setIsLoggedIn(true);
      const userDetails = JSON.parse(user);
      setUsername(userDetails.username);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Cloud Computing Assignment 1
        </Link>
        <div className="navbar" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isLoggedIn ? (
              <></>
            ) : (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{
                      fontWeight: "bold",
                      color: "#4267B2",
                      background: "#E7F3FF",
                      borderRadius: "20px",
                      padding: "6px 12px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    Welcome, {username}
                  </span>
                </li>

                {/* <li className="nav-item">
                  <Link className="nav-link active" to="/MusicTable">
                    Create music Table{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/LoadData">
                    Load a1.json Data
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/CreateBucketAndUploadImages"
                  >
                    upload images to s3-Bucket
                  </Link>
                </li> */}
                
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
