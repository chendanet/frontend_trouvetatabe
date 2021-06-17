import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate } from "store/actions";
import "pages/Booking/Booking.css";
import { Link } from "react-router-dom";

const Booking = () => {
const [seat, setSeat] = useState()
const [time, setTime] = useState()
const [date, setDate] = useState()
const [state, setState] = useState()


const dispatch = useDispatch();


//   const handleChange = (e) => {
//     setState(e.target.value)
// }

  const handleSubmit= (e) => {
    alert("La reservation est bien prise en charge");
    e.preventDefault();
    }


  const fetchBooking = async (e) => {
    const dataBooking = {
    booking: {
       seat: seat,
       time: time,
       date: date,

      },
    };
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/booking", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBooking),
    });

    if (response.status !== 200) {
      return;
    }

    const token = response.headers.get("Authorization").split("Bearer ")[1];
    const data = await response.json();
    const userId = data.data.id;
    const userEmail = data.data.attributes.email;
    const isManager = data.data.attributes.is_manager;
    console.log("here", isManager);

    dispatch(
      authenticate(
        {
          id: userId,
          email: userEmail,
          is_manager: isManager,
        },
        token
      )
    );

  };
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
      <h3> Make a Reservation </h3>
            </div>
            <form>
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="visitor_name"
            placeholder="John Doe"
            required
          />
          <label for="email">Your E-mail</label>
          <input
            type="email"
            id="email"
            name="visitor_email"
            placeholder="john.doe@email.com"
            required
          ></input>
          <label for="adult">Number of people</label>
        <input 
        type="number" 
        id="adult" name="total_adults" placeholder="2" min="1" required></input>
           <label for="appt">Select a time:</label>
            <input type="time" id="appt" name="appt" /> 
            <button type="submit" onClick={fetchBooking} className="btn-signin" label="submit"/>
        </form>
      </div>


  );
};

export default Booking;
