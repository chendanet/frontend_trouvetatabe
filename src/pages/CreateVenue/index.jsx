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

  const fetchCreateVenue = async (e) => {
    e.preventDefault();
    const dataVenue = new FormData(e.target);
    const response = await fetch(
      `https://trouvetatableapi.herokuapp.com/api/venues/`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dataVenue
      }
    );

    if (response) {
      history.push("/");
      return;
    }else (alert('Erreur !'));

    const data = await response.json();
    console.log("data", data);
  };

  return (
    <div className="container-page d-flex align-items-center justify-content-center  ">
      <div className="form-container">
        <h3> Create Venue</h3>
        <form onSubmit={fetchCreateVenue}>
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
          <label>Images</label>
          <input name="images[]" type="file" multiple={true} />
          </div>
          <div>
            <button type="submit" >
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
//         
//         <input type="submit" value="Send" />
//       </form>
//     </div>
//   );
// }

export default CreateVenue;