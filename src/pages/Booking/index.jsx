import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import "pages/Booking/Booking.css";
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'


const Booking = () => {
    const [seat, setSeat] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()

    const history = useHistory()
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)

    const dataBooking = {
        booking: {
            seat: seat,
            time: time,
            date: date
        }
    }
    const fetchBooking = async (e) => {
        e.preventDefault()


        console.log('token', token)

        const response = await fetch(`http://localhost:3000/api/bookings`,
            {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataBooking)
            })

        if (response) {
            history.push('/myBookings')
            return
        }

        const data = await response.json()
         console.log(data)
    }


    
    console.log("token", token);
    console.log("dataBooking", dataBooking);

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
            // onChange={(e) => setName(e.target.value)} 
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
        required
        onChange={(e) => setSeat(e.target.value)} 
        />
        <label for="checkin-date"> Reservation Date</label>
         <input 
         type="date" 
         id="checkin-date" 
         name="checkin" 
         align="center" required
         onChange={(e) => setDate(e.target.value)}
         />
         <br/>
        <label for="appt" align="center">Select a time:</label>
         <br/>
         <input 
         type="time" 
         id="appt" 
         name="appt"          
         onChange={(e) => setTime(e.target.value)}
        /> 
            <button type="submit" onClick={fetchBooking} className="btn-signin"> Submit </button> 
        </form>
      </div>
      </div>



  );
};

export default Booking;
