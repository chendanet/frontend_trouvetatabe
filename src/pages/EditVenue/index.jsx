import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";
import "pages/Venue/Venue.css";
import { PROD_EDIT_VENUE } from 'api/apiHandler'

const EditVenue = ({ venues, modal }) => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [cuisine, setCuisine] = useState();
  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer);
  const [seatnumber, setSeatnumber] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();

  const userId = useSelector((state) => state.authReducer.id);

  const dataVenue = {
    name: name,
    city: city,
    cuisine: cuisine,
    seatnumber: seatnumber,
    address: address,
    description: description,
  };

  const fetchEditVenue = async (e) => {
    e.preventDefault();
    const response = await fetch(`${PROD_EDIT_VENUE}/${idVenue}`,
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
  };


  useEffect(() => {
    fetch(`${PROD_EDIT_VENUE}/${idVenue}`)
      .then((response) => response.json())
      .then((data) => setCurrentVenue(data));
  }, [idVenue]);

  return (
    <div className="container d-flex align-items-center justify-content-center overlay ">
      <button type="button" onClick={modal} className="close">X</button>
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
            <label type="text" name="cuisine">
              Number of couvert
          </label>
            <input
              type="text"
              name="cuisine"
              onChange={(e) => setSeatnumber(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="cuisine">
            Address       
               </label>
            <input
              type="text"
              name="cuisine"
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="cuisine">
             Description      
               </label>
            <input
              type="text"
              name="cuisine"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div> <br />
            <button type="submit" onClick={fetchEditVenue}>
              Edit Venue
          </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default EditVenue;
