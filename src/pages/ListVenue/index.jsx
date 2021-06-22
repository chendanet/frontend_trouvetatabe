import React from "react";
import { useEffect, useState } from "react";
import "pages/ListVenue/listVenue.css";
import { Link } from "react-router-dom";
const ListVenues = ({ venues }) => {
  const [searchTerme, setSearchTerme] = useState("");

  console.log()

  return (
    <div className="container ">
      <div className="row w-100">
      <div className="col-md-3 col-sm-12 filter ">
        <ul>
          <li>categories</li>
          <li>categories</li>
          <li>categories</li>
        </ul>
        <ul>
          <li>categories</li>
          <li>categories</li>
          <li>categories</li>
        </ul>
        <ul>
          <li>categories</li>
          <li>categories</li>
          <li>categories</li>
        </ul>
        <ul>
          <li>categories</li>
          <li>categories</li>
          <li>categories</li>
        </ul>
        <ul>
          <li>categories</li>
          <li>categories</li>
          <li>categories</li>
        </ul>
      </div>
      <div className="col-md-9 col-sm-12  ">
        <form className="text-center">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchTerme(e.target.value)}
            placeholder="Search your restaurant"
            className="search-bar "
          />
        </form>
        {venues
          .filter((value) => {
            if (searchTerme == "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTerme.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item, index) => (
            <div className="image-item w-100 row" key={index}>
              <img src={`https://source.unsplash.com/600x600/?dish&sig=${index}}`} alt="" className="col-md-5 img-fluid p-0"/>
              <Link to={"/venues/" + item.id} className="col-md-6">
                <div className="container-item ">
                  <h5>{item.name}</h5>
                  <p>{item.city}</p>
                  <p>{item.cuisine}</p>
                  <button>valider</button>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default ListVenues;
