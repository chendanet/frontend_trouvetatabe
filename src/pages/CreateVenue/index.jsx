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
        `http://localhost:3000/api/venues/`,
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
        </div>
      </form>
        </div>
        </div>


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