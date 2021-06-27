/* eslint-disable array-callback-return */
import React from "react";
import { useState, useEffect } from "react";
import "pages/ListVenue/listVenue.css";
import { Link } from "react-router-dom";
import { PROD_EDIT_VENUE } from 'api/apiHandler';

export const ListVenues = () => {
  const [searchTerme, setSearchTerme] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [prices, setPrices] = useState([]);
  const CUISINES = [
    "American",
    "Asian",
    "Californian",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Mexican",
    "Seefood",
    "Steak",
  ]

  const PRICES = [
    "Under than 35",
    "35-50",
    "More than 50"
  ]

  const [venues, setVenues] = useState(undefined);

  useEffect(() => {
    fetch(PROD_EDIT_VENUE)
      .then((response) => response.json())
      .then((data) => {
        setVenues(data)
      });
  }, [])


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
    <>
      <div class="container-banner">
        <img className="image-banner" src="https://blobsvc.wort.lu/picture/d194915d6e522612578eb1ec0c695666/1600/600/crop/0/173/3147/1356/wortv3/b71afae820044a8e4eba107a27492392c4a1abba" alt="restaurant" />
        <div className="text-banner">
          <h1><center>It's finally summer ! 😎☀️</center></h1>
          <p><center>We can finally meet at the restaurant of bar without a mask ! 🍧</center></p>
          <p><center>With TrouveTaTable, we can easily reserve a place in just a few clicks ! 🖱 </center></p>
        </div>
      </div>
      <div className="container">
        <div className="detailsSearchbar input-group w-50">
          <span class="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel btn-outline-danger" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"></path>
            </svg>
          </span>
          <input type="text" name="search" class="form-control" placeholder="Search your restaurant" aria-label="SearchBarFilter" aria-describedby="basic-addon1" onChange={(e) => setSearchTerme(e.target.value)} />
        </div>
        <div className="advantageText">Registered clients get an exclusive 10% discount for every booking 😋 </div>
        <div className="w-100 mx-5">
          <div className="row w-100 flex-row-center ">
            <div className="col-md-2 col-sm-12 filter mt-1 me-4 filter-column">
              <div>
                <h5 className="text-center fw-bold mt-1 mb-4">Filter</h5>
                <div className="fs-6 mb-1 fw-bold">
                  Cuisine : 🍽️
                </div>
                {CUISINES.map((c, index) => (
                  <div key={index}>
                    <input type="checkbox"
                      name={c}
                      value={c}
                      onChange={handleChangeCuisine}
                      checked={cuisines.includes(c) ? "checked" : ""}
                    />
                    <label className="fw-bold">{c}</label>
                  </div>
                ))}
              </div>
              <br />
              <div className="fs-6 mb-1 fw-bold">
                Price :
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-currency-euro" viewBox="0 0 16 16">
                  <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z" />
                </svg>
              </div>
              <div>
                {PRICES.map((p, index) => (
                  <div key={index}>
                    <input type="checkbox"
                      name={p}
                      value={p}
                      onChange={handleChangePrice}
                      checked={prices.includes(p) ? "checked" : ""}
                    />
                    <label className="fw-bold">{p}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-9 col-sm-12 ms-1 ">
              <div class="row">
                {venues === undefined ? (
                  <div className="spinner spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : venues
                  .filter(value => cuisines.length === 0 || cuisines.indexOf(value.cuisine) > -1)
                  .filter(value => {
                    if (prices.length === 0) {
                      return true;
                    }
                    if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                      return true
                    }
                    if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                      return true
                    }
                    if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                      return true
                    }
                  })
                  .filter(value => value.name.toLowerCase().includes(searchTerme.toLowerCase()))
                  .map((item, index) => (
                    <div className="col-md-4 col-sm-6">
                      <Link to={"/venues/" + item.id} className="col-md-6">
                        <div className="card"  key={index}>
                          <div className="card_img-container ">
                            {!item.images[0] ?
                              <img
                                src={`https://source.unsplash.com/600x600/?dish&sig=${index}`}
                                alt={`${item.name}_image`}
                                className="card_img"
                              />
                              : <img
                                src={item.images[0]}
                                alt={`${item.name}_image`}
                                className="card_img"
                              />}
                          </div>
                          <div className="card_desc">
                            <h5 className="card_name" title={item.name}>{item.name}</h5>
                            <div className="card_city">{item.city}</div>
                            <div className="card_cuisine">{item.cuisine}</div>
                            <div className="card_price">{Math.floor(item.price * 0.90)} € instead of {item.price} €</div>
                            <button className="card_btn">View details</button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
