import React from "react";
import { useEffect, useState } from "react";
import "pages/ListVenue/listVenue.css";
import { useHistory, Link } from 'react-router-dom'
const ListVenues = () => {
  const [list, setList] = useState([]);
  const [searchTerme, setSearchTerme] = useState("")
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/venues")
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);




  return (
    <div className="container-list">
      <form>
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchTerme(e.target.value)}
          placeholder="Search your restaurant" />
      </form>

      <div className="filter">
        <ul>
          <li>toto toto</li>
          <li>toto toto</li>
          <li>toto toto</li>
        </ul>
        <ul>
          <li>toto</li>
          <li>toto</li>
          <li>toto</li>
        </ul>
        <ul>
          <li>toto</li>
          <li>toto</li>
          <li>toto</li>
        </ul>
        <ul>
          <li>toto</li>
          <li>toto</li>
          <li>toto</li>
        </ul>
        <ul>
          <li>toto toto</li>
          <li>toto toto</li>
          <li>toto toto</li>
        </ul>
      </div>
      <div className="container-img-item">
        {list.filter((value) => {
          if (searchTerme == "") {
            return value
          }
          else if (value.name.toLowerCase().includes(searchTerme.toLowerCase())) {
            return value
          }
        }).map((item, index) => (
          <div className="image-item" key={index}>
            <img
              src={item.photo}
              alt=""
            />
            <Link to={"/venues/" + item.id}>

              <div className="container-item">
                <h5>{item.name}</h5>
                <p>{item.city}</p>
                <p>{item.cuisine}</p>
                <button>valider</button>
              </div>
            </Link>
          </div>))}
      </div>
    </div>
  );
}

export default ListVenues;
