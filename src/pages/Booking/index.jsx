import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_BOOKINGS } from 'api/apiHandler';

const Booking = ({ modal, idVenue }) => {
  const [seat, setSeat] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const currentUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const dataBooking = {
    booking: {
      seat: seat,
      time: time,
      date: date,
      user_id: currentUser.id,
      venue_id: idVenue,
    },
  };
  const fetchBooking = async (e) => {
    e.preventDefault();


    const response = await fetch(PROD_BOOKINGS, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBooking),
    });

    const data = await response.json();

    if (response) {
      history.push("/profile");
      return;
    }
  };



  return (
    <div className="container d-flex align-items-center justify-content-center overlay">
      <div className="form-container " align="center">
        <h3> Book a table </h3>
        <button type="button" onClick={modal} className="close">X</button>
        <form>
        <label>
              Name
            </label>
          <input
            type="text"
            id="name"
            name="visitor_name"
            placeholder="Your Name"
            required
            className="form-control mb-2"
          // onChange={(e) => setName(e.target.value)}
          />
                  <label>
              Phone number
            </label>
          <input
            type="tel"
            id="phone"
            name="visitor_phone"
            placeholder="Your Phone"
            required
            className="form-control mb-2"
          />
                  <label>
              Number of people
            </label>
          <input
            type="number"
            id="people"
            name="total_people"
            placeholder="Number of people"
            min="1"
            required
            className="form-control mb-2"
            onChange={(e) => setSeat(e.target.value)}
          />
          <label for="checkin-date"> Booking Date</label>
          <input
            type="date"
            id="checkin-date"
            name="checkin"
            align="center"
            required
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <label for="appt" align="center">
            Select a time:
          </label>
          <br />
          <input className="form-control mb-4"
            type="time"
            id="appt"
            name="appt"
            required
            onChange={(e) => setTime(e.target.value)} />
          <button type="submit" onClick={fetchBooking} className="btn-signin">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
