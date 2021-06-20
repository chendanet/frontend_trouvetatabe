<<<<<<< HEAD
import React from 'react';
import { useState } from 'react';


const CreateVenue = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [price, setPrice] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  
  const handleZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const handlePrice = (e) => {
    e.target.valid ? setPrice(e.target.value) : alert("please insert number");
  };

  const handleCuisine = (e) => {
    setCuisine(e.target.value)
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSeatNumber = (e) => {
    setSeatNumber(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  
    fetch(`http://localhost:3000/api/venues`, {
      method: "post",
      body: data
    })
      .then(response => {
        if (response.ok) {
          console.log('Ok ça marche bro !');
        } else (alert('Erreur !'));
      })
      .catch(error => console.log('error', error));
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Sign Up</h3>
          <p>Create your account</p>
        </div>
        <form>
          <div>
            <input
              type="text"
              name="name"
              onChange={handleName}
              placeholder="What is the name of your establishment ?"
            />
            <br />
            <input
              rows="4"
              type="text"
              name="address"
              onChange={handleAddress}
              placeholder="What is the address of your establishment ?"
            />
            <br />
            <label>
              In what city?
              <select value={city} onChange={handleCity}>
                <option value="Paris">Paris</option>
                <option value="Marseille">Marseille</option>
                <option value="Bruxelle">Bruxelle</option>
                <option value="Lyon">Lyon</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Lisbonne">Lisbonne</option>
                <option value="London">London</option>
              </select>
              </label>{" "}
            <br />
            <input
              rows="4"
              type="text"
              name="zipcode"
              onChange={handleZipcode}
              placeholder="What is the zipcode of your establishment ?"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="price"
              onChange={handlePrice}
              placeholder="What is the average basket of your establishment ?"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              name="cuisine"
              onChange={handleCuisine}
              placeholder="Do you cook ? If so, what kind ?"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              name="zipcode"
              onChange={handleCity}
              placeholder="What is the zipcode of your establishment ?"
            />{" "}
            <br />
            <button type="submit" onClick={fetchSignUp} className="btn-signin">
              Sign up
            </button>
            <br />
            <Link to="/signin" className="link">
              <button className="btn-login">I have account</button>
            </Link>
=======
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import config from "config";

const CreateVenue = ({ venues }) => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer);
  const userId = useSelector((state) => state.authReducer.id);

  const [name, setName] = useState();
  // const [address, setAdress] = useState();
  const [city, setCity] = useState();
  // const [price, setPrice] = useState();
  const [cuisine, setCuisine] = useState();
  // const [category, setCategory] = useState();
  // const [phone_number, setPhonenumber] = useState();
  // const [zipcode, setZipcode] = useState();
  // const [description, setDescription] = useState();
  // const [seatnumber, setSeatnumber] = useState();

  const dataVenue = {
    venue: {
      user_id: userId,
      name: name,
      // address: address,
      city: city,
      // price: price,
      cuisine: cuisine,
      // category: category,
      // phone_number: phone_number,
      // zipcode: zipcode,
      // description: description,
      // seatnumber: seatnumber,
    },
  };

  const fetchCreateVenue = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://trouvetatableapi.herokuapp.com/api/venues/`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataVenue),
      }
    );

    if (response) {
      history.push("/");
      return;
    }

    const data = await response.json();
    console.log("data", data);
  };

  return (
    <div className="container-page d-flex align-items-center justify-content-center  ">
      <div className="form-container">
        <h3> Create Venue</h3>
        <form>
          <div>
            <label type="text" name="venuename">
              Name
          </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="city">
              City
          </label>
            <input
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <label type="text" name="cuisine">
              Cuisine
          </label>
            <input
              type="text"
              name="cuisine"
              onChange={(e) => setCuisine(e.target.value)}
            ></input>
          </div>
          <div>
            <button type="submit" onClick={fetchCreateVenue}>
              Create Venue
          </button>
>>>>>>> develop
          </div>
        </form>
      </div>
    </div>
<<<<<<< HEAD
    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     <label>Images</label>
    //     <input name="images[]" type="file" multiple={true} />
    //     <input type="submit" value="Send" />
    //   </form>
    //  </div>
=======


>>>>>>> develop
  );
};


//  ***********  CODE DE CHARLES, PAS TOUCHE!!!    ******


// const handleSubmit = (e) => {
//   e.preventDefault();
//   const data = new FormData(e.target);

//   fetch(`http://localhost:3000/api/venues`, {
//     method: "post",
//     body: data
//   })
//     .then(response => {
//       if (response.ok) {
//         console.log('Ok ça marche bro !');
//       } else (alert('Erreur !'));
//     })
//     .catch(error => console.log('error', error));
// }

// function CreateVenue() {
//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <label>Images</label>
//         <input name="images[]" type="file" multiple={true} />
//         <input type="submit" value="Send" />
//       </form>
//     </div>
//   );
// }

export default CreateVenue;