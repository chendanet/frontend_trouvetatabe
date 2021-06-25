import React from 'react'
import "components/Navbar/index.css";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/actions";
import { useHistory } from "react-router-dom";

function Navbar() {
  const currentUser = useSelector(state => state.authReducer)
  const history = useHistory();
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/')
    window.alert("Disconnecting...see you soon!")

  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark ">
        <div className="container-fluid ">
          <svg
            width="76"
            height="63"
            viewBox="0 0 76 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M74.6536 10.9893L74.6618 10.9944C74.7908 11.1495 74.8499 11.3027 74.8499 11.4545C74.8499 11.8961 74.4005 12.3864 73.6549 12.3864H39.7533H39.2533V12.8864V61.5622C39.2533 62.0038 38.8039 62.494 38.0583 62.494C37.3183 62.494 36.8632 62.0025 36.8632 61.5622V12.8864V12.3864H36.3632H2.46168C1.71605 12.3864 1.2666 11.8961 1.2666 11.4545C1.2666 11.3087 1.32119 11.1612 1.43691 11.0116L1.52147 10.9339C1.68527 10.7835 1.87155 10.6431 1.98831 10.603L2.03952 10.5855L2.08578 10.5573C12.2957 4.34981 24.5099 0.5 38.0583 0.5C51.9221 0.5 64.3108 4.50952 74.6536 10.9893ZM7.94908 9.57693L8.1755 10.5227H67.9834L68.2097 9.57686C59.3505 5.08084 49.1664 2.36364 38.0583 2.36364C26.9428 2.36364 16.8011 5.08098 7.94908 9.57693ZM65.1795 47.75H65.6795V47.25V34.3636C65.6795 33.9221 66.1289 33.4318 66.8746 33.4318C67.6202 33.4318 68.0696 33.9221 68.0696 34.3636V61.5682C68.0696 62.0097 67.6202 62.5 66.8746 62.5C66.1289 62.5 65.6795 62.0097 65.6795 61.5682V50.1136V49.6136H65.1795H55.009H54.509V50.1136V61.5622C54.509 62.0038 54.0596 62.494 53.314 62.494C52.5683 62.494 52.1189 62.0038 52.1189 61.5622V48.6818C52.1189 48.2403 52.5683 47.75 53.314 47.75H65.1795ZM10.4371 47.25V47.75H10.9371H22.8026C23.5468 47.75 23.9977 48.245 23.9977 48.6818V61.5682C23.9977 62.0097 23.5482 62.5 22.8026 62.5C22.057 62.5 21.6075 62.0097 21.6075 61.5682V50.1136V49.6136H21.1075H10.9371H10.4371V50.1136V61.5682C10.4371 62.0097 9.98761 62.5 9.24198 62.5C8.49635 62.5 8.04691 62.0097 8.04691 61.5682V34.3636C8.04691 33.9233 8.50197 33.4318 9.24198 33.4318C9.982 33.4318 10.4371 33.9233 10.4371 34.3636V47.25Z"
                fill="white"
                stroke="#FBFBFB"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="74.5833"
                  height="63"
                  fill="white"
                  transform="translate(0.766602)"
                />
              </clipPath>
            </defs>
          </svg>
          <Link className="nav-list item-list item-list-logo" aria-current="page" to="/">
            TrouveTaTable
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-flex">
              <li ></li>
              {!currentUser.id &&
                <div className="list-right ">
                  <li className="nav-item">
                    <Link className="nav-list item-list" to="/register">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-list item-list" to="/login">
                      Login
                      </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-list item-list" href="#">
                      Blog
                      </Link>
                  </li>
                </div>
              }
              {currentUser.id &&
                <div className="list-right">
                  <li className="nav-item">
                    <Link className="nav-list item-list" onClick={handleLogout}>
                      Logout
                       </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-list item-list" to="/profile">
                      Profil
                         </Link>
                  </li>
                  {currentUser.is_manager && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-list item-list" to="/venues">
                          Créer un restaurant
                      </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-list item-list" to="/myVenues">
                          Mes restaurants
                    </Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <a className="nav-list item-list" href="#">
                      Blog
                         </a>
                  </li>
                </div>
              }



            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

