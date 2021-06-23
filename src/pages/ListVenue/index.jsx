/* eslint-disable array-callback-return */
import React from "react";
import { useState } from "react";
import "pages/ListVenue/listVenue.css";
import { Link } from "react-router-dom";




const ListVenues = ({ venues }) => {
  const [searchTerme, setSearchTerme] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [prices, setPrices] = useState([]);
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

  const PRICES = [
    "Under than 35",
    "35-50",
    "More than 50"
  ]

  const handleChangeCuisine = (e) => {
    let { name } = e.target
    if (cuisines.indexOf(name) === -1) {
      setCuisines([...cuisines, name])
    } else {
      setCuisines(cuisines.filter((p) => p !== name))
    }
  }

  const handleChangePrice = (e) => {
    let { name } = e.target
    if (prices.indexOf(name) === -1) {
      setPrices([...prices, name])
    } else {
      setPrices(prices.filter((p) => p !== name))
    }
  }

  return (
    <div className="w-75 mx-auto ">
      <form className="text-center ">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchTerme(e.target.value)}
          placeholder="Search your restaurant"
          className="search-bar "
        />
      </form>
      <div className="row w-100 m-2">
        <div className="col-md-2 col-sm-12 filter mx-1 ">
          <div>
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
          <br />
          <div>
            {PRICES.map((p, index) => (
              <div key={index}>
                <input type="checkbox"
                  name={p}
                  value={p}
                  onChange={handleChangePrice}
                  checked={prices.includes(p) ? "checked" : ""}
                />
                <label>{p}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-8  col-sm-12  ">
          {venues
            .filter((value) => {
              if (cuisines.length === 0 && prices.length === 0) {
                if (searchTerme === "") {
                  return value;
                }
                if (value.name.toLowerCase().includes(searchTerme.toLowerCase())) {
                  return value;
                }
              }

              if (value.name.toLowerCase().includes(searchTerme.toLowerCase()) && cuisines.length === 0) {
                if (prices.length !== 0) {
                  if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                    return value
                  }
                  if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                    return value
                  }
                  if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                    return value
                  }
                }
              }

              if (searchTerme === "" && cuisines.indexOf(value.cuisine) >= 0) {
                if (prices.length === 0) {
                  return value;
                }
                if (prices.length !== 0) {
                  if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                    return value
                  }
                  if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                    return value
                  }
                  if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                    return value
                  }
                }
              }
              if (searchTerme === "" && cuisines.indexOf(value.cuisine) === 0) {
                if (prices.length !== 0) {
                  if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                    return value
                  }
                  if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                    return value
                  }
                  if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                    return value
                  }
                }
              }
              if (value.name.toLowerCase().includes(searchTerme.toLowerCase()) && cuisines.indexOf(value.cuisine) >= 0) {
                if (prices.length === 0) {
                  return value;
                }
                if (prices.length !== 0) {
                  if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                    return value
                  }
                  if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                    return value
                  }
                  if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                    return value
                  }
                }
              }
            })
            .map((item, index) => (
              <div className="image-item w-100 row" key={index}>
                
                <img src={item.photo === "" ? item.images : `https://source.unsplash.com/600x600/?dish&sig=${index}`} alt={item.name + " dish"} className="col-md-5 img-fluid p-0" />
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
