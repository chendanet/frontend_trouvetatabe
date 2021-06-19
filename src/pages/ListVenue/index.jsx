import React from "react";
import { useEffect, useState } from "react";
import "pages/ListVenue/listVenue.css";
import { useHistory, Link } from "react-router-dom";
const ListVenues = () => {
  const [list, setList] = useState([]);
  const [searchTerme, setSearchTerme] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const price = [
    {
      "id": 1,
      "name": "$$"
    },
    {
      "id": 2,
      "name": "$$$"
    },
    {
      "id": 3,
      "name": "$$$$"
    }
  ]

  useEffect(() => {
    fetch("http://localhost:3000/api/venues")
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
            <label>Italian</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>French</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>American</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Mexican</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Korean</label>
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
