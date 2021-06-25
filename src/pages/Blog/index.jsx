import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import config from "config";
import "pages/Booking/Booking.css";
import { useSelector } from "react-redux";
import { PROD_BOOKINGS } from 'api/apiHandler';

const Blog = () => {
  const [records, setRecords] = useState();
  const currentUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
     
      const fetchBlog= async () => {
        const response = await fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=restaurant+paris')
        const data = await response.json();
        
        }

        useEffect(() => {
          fetchBlog();
        }, [])

  return (
      <div className="form-container" >
    <div className="card m-2 p-2 d-flex align-items-center justify-content-center">
       <span>{data.records}  </span>
       </div>
       </div>
  );
};

export default Blog;
