/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_BOOKINGS } from 'api/apiHandler';
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import { FaStar } from "react-icons/fa";

const Ratings = ({ modal, idVenue }) => {

  const [venues, setVenues] = useState(undefined);

  useEffect(() => {
    fetch(PROD_EDIT_VENUE)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data)
      });
  }, [])


  const [score, setScore] = useState();
  const [review, setReview] = useState();
  const currentUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const dataRating = {
    rating: {
      score: score,
      review: review,
      user_id: currentUser.id,
      venue_id: idVenue,
    },
  };
  const fetchRating = async (e) => {
    e.preventDefault();


    const response = await fetch('https://trouvetatableapi.herokuapp.com/api/ratings', {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRating),
    });

    const data = await response.json();

    if (response) {
      alert('Thank\'s for the review !');
      history.push("/");
    } else {
      alert('Something was wrong !');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center overlay">
      <div className="form-container " align="center">
        <h3> Leave your review </h3>
        <div>
   
    </div>
        <button type="button" onClick={modal} className="close">✖️</button>
        <form>
          <input
            type="text"
            id="name"
            name="review"
            placeholder="Your Review 🧐"
            required="required"
            pattern="^(?!\s*$).+"
            className="form-control mb-2"
             onChange={(e) => setReview(e.target.value)}
          />
           <input
            type="number"
            id="score"
            name="score"
            placeholder="Score 1 to 5"
            min="1"
            max="5"
            pattern="^([1-5]|1[005])$"
            className="form-control mb-2"
            onChange={(e) => setScore(e.target.value)}
          />
          <button type="submit" onClick={fetchRating} className="btn-signin">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ratings;

