/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import {Modal, Alert, Button } from 'react-bootstrap';
import "./ratings.css";

const Ratings = ({ modal, idVenue }) => {

  const [venues, setVenues] = useState(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  

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
  
  const reviewRegex = /^(?!\s*$).+/;
  const scoreRegex = /^([1-5]|1[005])$/;

  const fieldIsValid = (
    reviewRegex.test(review) && scoreRegex.test(score)
  );
  const closeSuccess = () => {
    setShowSuccess(false);
    history.push("/");
  }

  const closeError = () => {
    setShowError(false);
  }

  const fetchRating = async (e) => {
    if (fieldIsValid){
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
      setShowSuccess(true);
      return;
    }
  }else { setShowError(true); 
    return;
  }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center overlay">
      <div className="form-container " align="center">
        <h3> Leave your ratings </h3>
        <div>
   
    </div>
        <button type="button" onClick={modal} className="close">✖️</button>
        <form onSubmit={fetchRating} keyboard={false} dblClick={false}>
          <input
            type="text"
            id="name"
            name="review"
            placeholder="Your Review 🧐"
            required="required"
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
            className="form-control mb-2"
            onChange={(e) => setScore(e.target.value)}
          />
          <input type="submit" value="Submit your review" className="btn-signin" />
        </form>
      </div>

      {/* **************  Success Alert ******************************** */}
      <>
      <div className="alert container">
        <Modal show={showSuccess} variant="success">
          <Alert variant="success">
              <Alert.Heading>Thank's for the review !</Alert.Heading>
              <p>
                We are happy with the feedback you bring to our restaurants.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={closeSuccess} variant="outline-success">
                  Close me y'all!
                </Button>
              </div>
          </Alert>
        </Modal>
        </div>
      </>
      {/* ********* Error Alert ******************************** */}
      <>
      <div className="alert container">
        <Modal show={showError} variant="danger">
          <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Be sure to write you're reviews in the block, and don't forget to choose a score between 1 - 5.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={closeError} variant="outline-danger">
                  Close me y'all!
                </Button>
              </div>
          </Alert>
        </Modal>
        </div>
      </>
    </div>
  );
};

export default Ratings;

