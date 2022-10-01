import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from "../Context/Alert/alertContext";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const Notification = useContext(alertContext);
  const { setMsg } = Notification;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMsg("User Logout Successfully", "success");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                signup
              </Link>
            </form>
          ) : (
            <button type="button" className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
