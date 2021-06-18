import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";
import "pages/Venue/Venue.css";



const Venue = ({ venues }) => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [cuisine, setCuisine] = useState();

  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer);
  const [seat, setSeat] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()
    const userId = useSelector(state => state.authReducer.id)

  const dataVenue = {
    venue: {
      name: name,
      city: city,
      cuisine: cuisine,
    },
  };
  console.log(currentUser);
  const fetchEditVenue = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/venues/${idVenue}`,
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
  const fetchDeleteVenue = async () => {
    const response = await fetch(
      `http://localhost:3000/api/venues/${idVenue}`,
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
    fetch(`http://localhost:3000/api/venues/${idVenue}`)
      .then((response) => response.json())
      .then((data) => setCurrentVenue(data));
  }, [idVenue]);

  // ajout page /////////////////////////
  


    const dataBooking = {
        booking: {
            seat: seat,
            time: time,
            date: date,
            user_id: userId,
            venue_id: idVenue
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
            history.push('/')
            return
        }

        const data = await response.json()
         console.log(data)
    }


    
    console.log("token", token);
    console.log("dataBooking", dataBooking);


  const body = (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <h3>Edit Venue</h3>
      </div>
      <form>
        <div>
          <label type="text" name="username">
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
            {" "}
            City{" "}
          </label>
          <textarea
            rows="4"
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label type="text" name="cuisine">
            {" "}
            Cuisine{" "}
          </label>
          <input
            type="number"
            name="cuisine"
            onChange={(e) => setCuisine(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit" onClick={fetchEditVenue}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
  return (
    // <div className="container-page">
      <div className="container-page d-flex align-items-center justify-content-center  ">
        <div>
          {currentVenue && (
            <div >
              <img src={currentVenue.photo} alt="" className="img-fluid card-border" />
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
                  <h4>
                Price:
                </h4>
                  <span>{currentVenue.price}</span>
                  </div>
                  <div>
                  <Link  to="/booking">
                  <button type="button">Find a Table</button> </Link>
                  </div>
                 </div>
              </div>

              {currentVenue.user_id == currentUser.id && (
                <div className="d-flex justify-content-around m-3">
                  <div>
                    <button type="button" onClick={fetchEditVenue}>Edit</button>
                  </div>
                  <button onClick={fetchDeleteVenue}>Delete</button>
                </div>
              )}
            </div>
        )}
        
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
          
            // onChange={(e) => setName(e.target.value)} 
          />
          <label for="phone">Your Phone</label>
          <input type="tel" 
          id="phone"
          name="visitor_phone"
          placeholder="498-348-3872"  
          />
          <label for="adult">Number of people</label>
        <input 
        type="number" 
        id="people" 
        name="total_people" 
        placeholder="2" 
        min="1" 
      
        onChange={(e) => setSeat(e.target.value)} 
        />
        <label for="checkin-date"> Reservation Date</label>
         <input 
         type="date" 
         id="checkin-date" 
         name="checkin" 
         align="center" 
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


        </div>
      </div>
    // </div>
  );
};

export default Venue;
