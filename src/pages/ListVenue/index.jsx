import React from "react";
import { useEffect, useState } from "react";
import "pages/ListVenue/listVenue.css";
import { useHistory, Link } from "react-router-dom";
const ListVenues = () => {
  const [list, setList] = useState([]);
  const [searchTerme, setSearchTerme] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const cuisine = [
    {
      "id": 1,
      "name": "Steak"
    },
    {
      "id": 2,
      "name": "Seafood"
    },
    {
      "id": 3,
      "name": "French"
    },
    {
      "id": 4,
      "name": "Asian"
    },
  ]

  useEffect(() => {
    fetch("https://trouvetatableapi.herokuapp.com/api/venues")
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return (
    <div className="container-list">
      <div className="filter">
        <div>
          <div>Price</div>
          <div>
            <input type="checkbox" />
            <label>$$</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>$$$</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>$$$$</label>
          </div>
        </div>
        <div>
          <div>Cuisine</div>
          <div>
            <input type="checkbox" />
            <label>Steak</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Seafood</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>French</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Asian</label>
          </div>
        </div>
      </div>
      <div className="container-img-item">
        <form>
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchTerme(e.target.value)}
            placeholder="Search your restaurant"
            className="search-bar"
          />
        </form>
        {list
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
            <div className="image-item" key={index}>
              <img src={item.photo} alt="" />
              <Link to={"/venues/" + item.id}>
                <div className="container-item">
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
  );
};

export default ListVenues;
