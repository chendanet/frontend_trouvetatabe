import React, { useEffect, useState } from "react";
import "pages/Blog/Blog.css";
import { v4 as uuidv4 } from 'uuid'
import Event from "components/Event";

const Blog = () => {

  const [data, setData] = useState();
  const DisplayDate = (UTCDateTime) => {
    var date = new Date(UTCDateTime);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var formattedDate = day + "-" + month + "-" + year
    return formattedDate;
  }

  useEffect(() => {
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const events = data && data.records.map((record) => record.record.fields);

  return (
    <div className="w-100  container-bg ">
      <div className="row w-100 justify-content-center ">
        <h2 className="my-5 text-center fw-bold"> Blog TrouveTaTable ...</h2>
        <h6 className=" text-center fw-bold"> ...soon with new features</h6>
        {events &&
          events.map((event) => (
            <Event event={event} key={uuidv4()} DisplayDate={DisplayDate} />
          ))}
      </div>
    </div>
  );
};
export default Blog;
