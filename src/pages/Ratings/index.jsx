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
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


const Ratings = ({ modal, idVenue }) => {

  const [venues, setVenues] = useState(undefined);
  const [show, setShow] = useState(false);

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
      history.push("/");
    } else {
      setShow(true); 
      return    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center overlay">
      <div className="form-container " align="center">
        <h3> Leave your review </h3>
        <div>
   
    </div>
        <button type="button" onClick={modal} className="close">✖️</button>
        <form>
        <label>
            Leave your review
            </label>   
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
          <label>
            and a score
            </label>  
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
        {/* ****************************** Alert ********************** */}
        <>
      <Modal show={show} variant="success" align="center">
      <div className="card rounded-5 p-3 m-4" align="center">

        <Alert.Heading> Ops, sorry </Alert.Heading>
        <hr />
        <p> Could not register your review. Please try again   </p>
          <Button onClick={() => setShow(false)} variant="outline-danger">
Close      </Button>
</div>

      </Modal>
       </>

       {/* ****************************** Alert ********************** */}
      </div>
    </div>
  );
};

export default Ratings;

