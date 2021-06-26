import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_BOOKINGS } from "api/apiHandler";

const Blog = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=10`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const events = data && data.records.map((record) => record.record.fields);
  console.log(events);

  return (
    <div className="w-100 mx-5">
      <div className="row w-100 justify-content-center ">
        <h2 className="text-center m-5">Le blog Trouve Ta Table</h2>
      {events &&
        events.map((item, index) => (
          
            <div className="card col-md-3 rounded-5 p-3 m-4">
              <div className="card_img-container mb-3">
                <img src={item.cover.url} alt="events paris" className="card_img rounded-2"/>
              </div>
            <h5 className="card-title m-2"> {item.title} </h5>
            
              <p className="m-2"> Evenement -{item.price_type}</p>
              <p className="m-2"> Date: {item.date_start}</p>
              <button>
                {" "}
                <a href={item.url}>Link Event</a>
              </button>
            </div>
         
        ))}
       
      </div>
    </div>
  );
};
export default Blog;
