import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "pages/VenueDetail/Venue.css";
import { PROD_EDIT_VENUE } from "api/apiHandler";
import Map from "components/Map";
import VenueCard from "components/VenueCard";
import Reviews from "components/Reviews";
import ListBooking from "components/ListBooking";

const VenueDetail = () => {

  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const currentUser = useSelector((state) => state.authReducer);
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()

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
    // eslint-disable-next-line
  }, [currentCity, currentAddress]);


  return (
    <div className="container-bg  w-100">
      <div className="container w-100 ">
        {currentVenue && (
          <div className="w-100 justify-content-center">
            <div className="row my-5 d-flex justify-content-center">
              <VenueCard currentVenue={currentVenue} currentUser={currentUser} idVenue={idVenue} />
              <Map latitude={lat} longitude={lon} currentVenue={currentVenue} />
            </div>
            <div className="row my-5 d-flex justify-content-center">
              <Reviews currentVenue={currentVenue} currentUser={currentUser} idVenue={idVenue} />
            </div>
            {currentVenue.user_id === parseInt(currentUser.id) && (
              <div className="row my-5 d-flex justify-content-center w-100">
                <ListBooking currentVenue={currentVenue} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetail;
