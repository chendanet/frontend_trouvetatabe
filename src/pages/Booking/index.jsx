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
    const response = await fetch("http://localhost:3000/api/bookings", {
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
      <div className="form-container" align="center">
      <h3> Make a Reservation </h3>
            <form>
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="visitor_name"
            placeholder="John Doe"
            required
          />
          <label for="phone">Your Phone</label>
          <input type="tel" 
          id="phone"
          name="visitor_phone"
          placeholder="498-348-3872"  
          required />
          <label for="adult">Number of people</label>
        <input 
        type="number" 
        id="people" 
        name="total_people" 
        placeholder="2" 
        min="1" 
        required>
        </input>
        <label for="checkin-date"> Reservation Date</label>
         <input type="date" id="checkin-date" name="checkin" align="center" required/>
         <br/>
           <label for="appt" align="center">Select a time:</label>
           <br/>

            <input type="time" id="appt" name="appt" /> 
            <button type="submit" onClick={fetchBooking} className="btn-signin"> Submit </button> 
        </form>
      </div>
      </div>



  );
};

export default Booking;
