import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_BOOKINGS } from 'api/apiHandler';

const Blog = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=10`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data)
      });
  }, [])

  const events = data&&data.records.map(record => record.record.fields);
  console.log(events)

  return (
    <div className="col">
      {events && events.map((item, index) =>
        <div className="row" align="center">
       <div className="col-md-6 col-sm-12">      
            <p><img
             src={item.cover.url}          
            ></img></p>
           <span> Name: {item.title} </span> 
            <p>  Evenement -{ item.price_type}</p> 
        <p> Date: {item.date_start}</p>
        <button> <a href={item.url}>Link Event</a></button>



</div>
</div>

      )}
    </div>
  );
  
} 
export default Blog

