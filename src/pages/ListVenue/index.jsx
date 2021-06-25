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
    "Steak",
    "Seefood",
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
          <h1><center>C'est enfin l'été ! 😎☀️</center></h1>
          <p><center>Nous pouvons enfin nous retrouver au restaurant ou au bar sans masque ! 🍧</center></p>
          <p><center>Avec Trouvetatable, réservez rapidement votre place en quelques clics ! 🖱 </center></p>
        </div>
      </div>
      <form className="form-searchBar">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchTerme(e.target.value)}
          placeholder="Search your restaurant"
          className="search-bar"
        />
      </form>
      <div className="container">
        <div className="w-100 mx-5">
          <div className="row w-100 flex-row-center">
            <div className="col-md-2 col-sm-12 filter mt-1 me-4 filter-column">
              <div>
                <h5 className="text-center fw-bold mt-1 mb-4">Filter</h5>
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
            <div className="col-md-9  col-sm-12 ms-1 ">
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
                        <div className="card" key={index}>
                          <div className="card_img-container">
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
                            <div className="card_price">{Math.floor(item.price * 0.90)} € au lieu de {item.price} €</div>
                            <button className="card_btn">valider</button>
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
