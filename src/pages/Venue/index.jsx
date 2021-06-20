import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";
import "pages/Venue/Venue.css";
import Booking from "pages/Booking";
import EditVenue from "pages/EditVenue";


const Venue = ({ venues }) => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [cuisine, setCuisine] = useState();
  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer);
  const [seat, setSeat] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const userId = useSelector((state) => state.authReducer.id);

  const dataVenue = {
    venue: {
      name: name,
      city: city,
      cuisine: cuisine,
    },
  };



  // delete venue ////////////////////////

  const fetchDeleteVenue = async () => {
    const response = await fetch(
      `https://trouvetatableapi.herokuapp.com/api/venues/${idVenue}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    history.push("/");
  };

  useEffect(() => {
    fetch(`https://trouvetatableapi.herokuapp.com/api/venues/${idVenue}`)
      .then((response) => response.json())
      .then((data) => setCurrentVenue(data));
  }, [idVenue]);

  // edit venue ////////////////////////

  console.log(currentUser);
  const fetchEditVenue = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://trouvetatableapi.herokuapp.com/api/venues/${idVenue}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataVenue),
      }
    );

    if (response) {
      history.push("/");
      return;
    }

    const data = await response.json();
    console.log("data", data);
  };


  // toggle modal
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }


  return (
    // <div className="container-page">
    <div className="container-page d-flex align-items-center justify-content-center  ">
      <div>
        {currentVenue && (
          <div>
            <img
              src={currentVenue.photo}
              alt=""
              className="img-fluid card-border"
            />
            <div className="card mt-3 p-4 card-border">
              <h2>{currentVenue.name}</h2>
              <h6>{currentVenue.cuisine}</h6>
              <p>{currentVenue.description}</p>
            </div>
            <div className="card mt-3 p-4 card-border">
              <div className="d-flex justify-content-around mb-5">
                <div>
                  <h2>Adresse: </h2>
                  <span>{currentVenue.address}</span>
                </div>
                <div>
                  <h2>Phone number</h2>
                  <span>{currentVenue.phone_number}</span>
                </div>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-3">
                <div>
                  <h4>Price:</h4>
                  <span>{currentVenue.price}</span>
                </div>
                <div>

                  <button type="button" onClick={toggleModal}>Find a Table</button>{" "}

                </div>
              </div>
            </div>

            {currentVenue.user_id == currentUser.id && (
              <div className="d-flex justify-content-around m-3">
                <div>
                <Link to="/editvenues">
                <button type="button" idVenue={idVenue}>
                    Edit
                  </button>
                  </Link>
                </div>
                <button  onClick={fetchDeleteVenue}>Delete</button>
              </div>
            )}

<div className="container-page d-flex align-items-center justify-content-center  ">
      <div className="form-container">
<h3> Edit Venue</h3>
        <form>
          <div>
            <label type="text" name="venuename">
              Name
          </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="city">
              City
          </label>
            <input
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="cuisine">
              Cuisine
          </label>
            <input
              type="text"
              name="cuisine"
              onChange={(e) => setCuisine(e.target.value)}
            ></input>
          </div>
          <div>
            <button type="submit" onClick={fetchEditVenue}>
              Edit Venue
          </button>
          </div>
        </form>
        </div>
        </div>
          </div>
        )}


      </div>
      {modal &&
        (<>

          <Booking modal={toggleModal} idVenue={idVenue} />
        </>)
      }
        </div>

    // </div>
  );
};

export default Venue;





