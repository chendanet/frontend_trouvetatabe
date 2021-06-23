import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";
import "pages/Venue/Venue.css";
import Booking from "pages/Booking";
import EditVenue from "pages/EditVenue";
import { PROD_EDIT_VENUE,  PROD_BOOKINGS } from 'api/apiHandler';


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
  const [bookings, setBookings] = useState([])
  
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
      `${PROD_EDIT_VENUE}/${idVenue}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    history.push("/myVenues");
  };

  useEffect(() => {
    fetch(`${PROD_EDIT_VENUE}/${idVenue}`)
      .then((response) => response.json())
      .then((data) => setCurrentVenue(data));
  }, []);


  // edit venue ////////////////////////

  const fetchEditVenue = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${PROD_EDIT_VENUE}/${idVenue}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataVenue),
      }
    );
    history.push("/myVenues");
    const data = await response.json();
  };


  // toggle modal
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  // toggle modal editVenue
  const [modal1, setModal1] = useState(false)
  const toggleModal1 = () => {
    setModal1(!modal1)
  }



  const fetchAllBookings = async () => {
    const response = await fetch(PROD_BOOKINGS)
    const data = await response.json()
    setBookings(data)
  }

  useEffect(() => {
    fetchAllBookings();
  }, [])

  


  
    console.log("seat total:",currentVenue.seatnumber)
    const seatNumberBooking = (bookings &&
      bookings.filter(booking => booking.venue_id == currentVenue.id)
        .map((booking) => 
             booking.seat
          
      ))
    const sumSeatNumber = seatNumberBooking.reduce((a, b) => a + b, 0);
    console.log(sumSeatNumber);
    
    const currentSeatNumber = currentVenue.seatnumber -sumSeatNumber
      console.log("seat reservé:",seatNumberBooking);
      console.log("seat actuel:", currentSeatNumber);


  return (
    // <div className="container-page">
    <div className="container-page d-flex align-items-center justify-content-center  ">
      <div>
        {currentVenue && (
          <div>
            <img
              src={currentVenue.images}
              alt={`${currentVenue.name}_image`}
              className="img-fluid card-border"
            />
            <div className="card mt-3 p-4 card-border">
              <h2>{currentVenue.name}</h2>
              <h6>{currentVenue.cuisine}</h6>
              <p>{currentVenue.description}</p>
            </div>
            <div className="card mt-3 p-4 card-border">
              <div className="row mb-5">
                <div className="col-md-6 col-sm-12">
                  <h2>Adresse: </h2>
                  <span>{currentVenue.address}</span>
                </div>
                <div className="col-md-6 col-sm-12">
                  <h2>Phone number</h2>
                  <span>{currentVenue.phone_number}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <h4>Price: <span className="text-dark fs-5">{currentVenue.price} €</span></h4>
                </div>
                {currentUser.id && currentVenue.user_id != currentUser.id &&
                  <div className="col-md-6 col-sm-12">
                    <button type="button" onClick={toggleModal}>Find a Table</button>{" "}
                  </div>}
                {!currentUser.id &&
                  <div className="col-md-6 col-sm-12">
                    <Link to="/register">
                      <button>
                        Sign or Login to Find a Table
                      </button>
                    </Link>
                  </div>}

              </div>
            </div>

            {currentVenue.user_id == currentUser.id && (
              <div className="d-flex  flex-column m-3 justify-content-center">
              
                <div>
                  <h4>Place restante:</h4>
                 
                  {currentSeatNumber>0? currentSeatNumber: 0} / {currentVenue.seatnumber}
                          
                  
                
                        
                <h4 className="text-center">List des reservations:</h4>
                <div className="container ">
                  {bookings &&
                    bookings.filter(booking => booking.venue_id == currentVenue.id)
                      .map((booking,index) => (
                        <div key={ index}className="card m-2 p-2 d-flex align-items-center justify-content-center">
                          <h2>{booking.venue.name}</h2>
                          <h4>seat:</h4>
                          <span>{booking.seat}</span>
                          <h4>Date:</h4>
                          <span>{booking.date}</span>
                          <h4>Time:</h4>
                          <span>{booking.time}</span>
                          {/* <div className="delete-button">
                              <button alt="trashcan" onClick={() => deleteBooking(booking.id)}> Supprimer </button>
                            </div> */}
                        </div>
                      )
                      )}
                </div>
                </div>
                <div className="text-center">
                  <button type="button" onClick={toggleModal1} idVenue={idVenue} className="m-2">
                    Edit
                  </button>
                  <button onClick={fetchDeleteVenue} className="m-2">Delete</button>
                </div>
              </div>
            )}
          </div>
        )}


      </div>
      {modal &&
        (<>

          <Booking modal={toggleModal} idVenue={idVenue} />
        </>)
      }

      {modal1 &&
        (<>

          <EditVenue modal={toggleModal1} idVenue={idVenue} />
        </>)
      }

    </div>

    // </div>
  );
};

export default Venue;