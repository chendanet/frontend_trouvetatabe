/* eslint-disable array-callback-return */
import React from "react";
import { useState } from "react";
import "pages/Home/listVenue.css";
import Banner from "components/Banner";
import SearchBar from "components/SearchBar";
import Filter from "components/Filter";
import ListVenue from "components/ListVenue";

const Home = ({ venues }) => {
  const [cuisines, setCuisines] = useState([]);
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Banner />
      <div className="container">
        <SearchBar setSearchTerm={setSearchTerm} />
        <br />
        <div className="w-100 mx-5">
          <div className="row w-100 flex-row-center ">
            <Filter cuisines={cuisines} prices={prices} setCuisines={setCuisines} setPrices={setPrices} />
            <ListVenue venues={venues} cuisines={cuisines} prices={prices} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
};



export default Home