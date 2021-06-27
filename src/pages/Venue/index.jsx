import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";
import "pages/Venue/Venue.css";
import Booking from "pages/Booking";
import EditVenue from "pages/EditVenue";
import Ratings from "pages/Ratings";
import { PROD_EDIT_VENUE, PROD_BOOKINGS } from "api/apiHandler";
import MapOpen from "pages/Map";

const Venue = () => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [cuisine, setCuisine] = useState();
  const history = useHistory();
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const currentUser = useSelector((state) => state.authReducer);
  // const [seat, setSeat] = useState();
  // const [time, setTime] = useState();
  // const [date, setDate] = useState();
  const userId = useSelector((state) => state.authReducer.id);
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [bookings, setBookings] = useState([])
  const [ratings, setRatings] = useState([])
  const star = "⭐️"
  const [emptyRatings, setEmptyRatings] = useState()
  const [emptyBookings, setEmptyBookings] = useState()

  const dataVenue = {
    venue: {
      name: name,
      city: city,
      cuisine: cuisine,
    },
  };
  const [venues, setVenues] = useState(undefined);

  useEffect(() => {
    fetch(PROD_EDIT_VENUE)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data);
      });
  }, []);

  // delete venue ////////////////////////

  const fetchDeleteVenue = async () => {
    const response = await fetch(`${PROD_EDIT_VENUE}/${idVenue}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    history.push("/myVenues");
  };

  const fetchVenue = async () => {
    const response = await fetch(`${PROD_EDIT_VENUE}/${idVenue}`);
    const data = await response.json();
    setCurrentVenue(data);
    setCurrentAddress(data.address.replaceAll(" ", "+"));
    setCurrentCity(data.city);
  };

  const fetchCordinatesFromAdresse = async () => {

    if (currentAddress && currentCity) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${currentAddress}+${currentCity}&format=jsonv2`
      );
      const data = await response.json();
      if (Object.entries(data).length !== 0) {
        setLat(data[0].lat)
        setLon(data[0].lon)
      }
      else {
        setLat(currentVenue.lat)
        setLon(currentVenue.lng)
      }
    }
    else {
      return
    }
  }

  useEffect(() => {
    fetchVenue()
    fetchCordinatesFromAdresse()
  }, [currentCity, currentAddress]);


  // toggle modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  // toggle modal editVenue
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  // toggle modal Rating
  const [modalRating, setModalRating] = useState(false);
  const toggleModalRating = () => {
    setModalRating(!modalRating);
  };

  const fetchAllBookings = async () => {
    const response = await fetch(PROD_BOOKINGS);
    const data = await response.json();
    setBookings(data);
    setEmptyBookings(data)
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  /* ********************************** RATINGS ********************************** */

  const fetchAllRatings = async () => {
    const response = await fetch('https://trouvetatableapi.herokuapp.com/api/ratings')
    const data = await response.json()
    setRatings(data)
    setEmptyRatings(data)
  }

  useEffect(() => {
    fetchAllRatings();
  }, [])

  let emptyRate = emptyRatings && emptyRatings.filter(rating => rating.venue_id == currentVenue.id)
  let emptyBooking = emptyBookings && emptyBookings.filter((booking) => booking.venue_id == currentVenue.id)

  /* ********************************** RATINGS ********************************** */

  return (
    <div className="container w-100  ">
      {currentVenue && (
        <div className="w-100 justify-content-center">
          <div className="row my-5 d-flex justify-content-center">
            <div className="col-md-5">
              <div className="card">
                {!currentVenue.images[0] ?
                  <div className="">
                    <img
                      src={currentVenue.photo}
                      alt={`${currentVenue.name}_dish`}
                      className="card-img-top card_img w-100"
                    />
                  </div>
                  : <div>
                    <img
                      src={currentVenue.images[0]}
                      alt={`${currentVenue.name}_dish`}
                      className="card-img-top card_img w-100"
                    />
                  </div>
                }

                <div className="px-3 pt-2">
                  <h2 className="title-venue">{currentVenue.name}</h2>
                  <h6>{currentVenue.cuisine}</h6>
                  <p className="text-justify">{currentVenue.description}</p>

                  <div className="">
                    <div className="row mb-3">
                      <div className="col-md-6 col-sm-12">
                        <h6>Adresse: </h6>
                        <span>{currentVenue.address}</span>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <h6>Phone number</h6>
                        <span>{currentVenue.phone_number}</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <h6>Price</h6>
                      <span className="text-dark h6 fw-normal">{Math.floor(currentVenue.price * 0.90)} € au lieu de {currentVenue.price} €</span>

                    </div>

                    <div className="col-md-12 col-sm-12 my-2">
                      {currentUser.id && currentVenue.user_id != currentUser.id && (
                        <div>
                          <button type="button" onClick={toggleModal}>
                            Find a Table
                            </button>{" "}
                        </div>
                      )}

                      {!currentUser.id && (
                        <div>
                          <Link to="/register">
                            <button>Sign or Login to Find a Table</button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  {currentVenue.user_id == currentUser.id && (
                    <div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={toggleModal1}
                          idVenue={idVenue}
                          className="m-2"
                        >
                          Edit
                  </button>
                        <button onClick={fetchDeleteVenue} className="m-2">
                          Delete
                  </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {lat && lon &&
                <MapOpen latitude={lat} longitude={lon} currentVenue={currentVenue} />
              }
            </div>
          </div>
          <div className="row my-5 d-flex justify-content-center">

            <div className="card w-75 px-3 pt-2">
              <h5> Reviews </h5>
              <div className="">

                {/* ********************************** RATINGS ********************************** */}
                {ratings &&
                  ratings.filter(rating => rating.venue_id == currentVenue.id)
                    .map((rating) => (
                      <div class="col-md-12 col-sm-12 col-xs-12 my-2">
                        <span>{`${star.repeat(Math.abs(rating.score)) + " - " + rating.review}`}</span>
                      </div>
                    )

                    )}
                {/* ********************************** RATINGS ********************************** */}

                {emptyRate && emptyRate.length == 0 &&
                  <p>This restaurant doesn't have any review yet</p>}

              </div>

              {currentUser.id && currentVenue.user_id != currentUser.id && (
                <div className="mb-2">
                  <button type="button" onClick={toggleModalRating}>
                    {" "}
                      Leave a Review
                    </button>{" "}
                </div>
              )}
            </div>
          </div>


          {currentVenue.user_id == currentUser.id && (

            <div className="row my-5 d-flex justify-content-center w-100">
              <h4 className="text-center">List des reservation dans le restaurant {currentVenue.name}</h4>
              {bookings &&
                bookings
                  .filter(
                    (booking) => booking.venue_id == currentVenue.id
                  )
                  .map((booking) => (
                    <div className="col-md-5 col-xs-12 ms-4 my-2" key={booking.id}>
                      <div className="card m-2 p-2">
                        <h6>{booking.venue.name}</h6>
                        <h6>seat: <span className=" h6 fw-normal">{booking.seat}</span></h6>

                        <h6>Date: <span className=" h6 fw-normal">{booking.date}</span></h6>

                        <h6>Time: <span className=" h6 fw-normal">{booking.time}</span></h6>

                      </div>
                    </div>
                  )
                  )}

              {emptyBooking && emptyBooking.length == 0 &&
                <p className="text-center">This restaurant doesn't have any reservation yet</p>}
            </div>
          )}

        </div>
      )}
      {modal && (
        <>
          <Booking modal={toggleModal} idVenue={idVenue} />
        </>
      )}

      {modal1 && (
        <>
          <EditVenue modal={toggleModal1} idVenue={idVenue} />
        </>
      )}

      {modalRating && (
        <>
          <Ratings modal={toggleModalRating} idVenue={idVenue} />
        </>
      )}
    </div>
  );
};

export default Venue;
