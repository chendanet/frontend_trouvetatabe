import React from "react";
import { useEffect, useState } from "react";
import "pages/ListVenue/listVenue.css";
import { Link } from "react-router-dom";




const ListVenues = ({ venues }) => {
  const [searchTerme, setSearchTerme] = useState("");
  const [cuisines, setCuisines] = useState([])

  const CUISINES = [
    "Steak",
    "Seafood",
    "French",
    "Asian",
    "Indian",
    "Italian",
    "American",
    "Mexican",
    "Californian",
    "Korean"
  ]

  const handleChangeCuisine = (e) => {
    let { name } = e.target

    if (cuisines.indexOf(name) == -1) {
      setCuisines([...cuisines, name])
    } else {
      setCuisines(cuisines.filter((p) => p !== name))
    }

  }

  console.log('cuisines', cuisines.length)
  return (
    <div className="container-list">
      <div className="filter">
        {CUISINES.map((c, index) => (
          <div key={index}>
            <input type="checkbox"
              name={c}
              value={c}
              onChange={handleChangeCuisine}
              checked={cuisines.includes(c) ? "checked" : ""}
            />
            <label>{c}</label>
          </div>
        ))}
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
        {venues
          .filter((value) => {
            if (searchTerme == "") {
              if (cuisines.length == 0) {
                return value;
              }
            }
            if (value.name.toLowerCase().includes(searchTerme.toLowerCase()) && cuisines.length === 0) {
              return value;
            }
            if (searchTerme == "") {
              if (cuisines.indexOf(value.cuisine) >= 0) {
                return value;
              }
            }
            if (value.name.toLowerCase().includes(searchTerme.toLowerCase())) {
              if (cuisines.indexOf(value.cuisine) >= 0) {
                return value;
              }
            }

          })
          .map((item, index) => (
            <div className="image-item" key={index}>
              <img src={`https://source.unsplash.com/600x600/?dish&sig=${index}}`} alt="" />
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
