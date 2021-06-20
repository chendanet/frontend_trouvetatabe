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
          </div>
        </form>
      </div>
    </div>
    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     <label>Images</label>
    //     <input name="images[]" type="file" multiple={true} />
    //     <input type="submit" value="Send" />
    //   </form>
    //  </div>
  );
}

export default CreateVenue;