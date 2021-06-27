import React from 'react';
import { useRef } from 'react';
import Cookies from 'js-cookie';
import config from 'config';
import { useHistory } from 'react-router-dom';
import { PROD_CREATE_VENUE} from 'api/apiHandler'
import { useState } from 'react'

import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


function CreateVenue() {
  const nameRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const zipcodeRef = useRef();
  const priceRef = useRef();
  const cuisineRef = useRef();
  const phoneNumberRef = useRef();
  const terraceRef = useRef();
  const seatNumberRef = useRef();
  const descriptionRef = useRef();
  const token = Cookies.get(config.COOKIE_STORAGE_KEY);
  const history = useHistory();
  const [show, setShow] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(PROD_CREATE_VENUE, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        if (response.ok) {
          history.push('/myVenues');

        } else {
          setShow(true); 
          return
        }
      })
      .catch(error => console.error('error', error));
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Create your venue</h3>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Venue name
            </label>
            <input
              type="text"
              name="name"
              ref={nameRef}
              placeholder="ex: Le Paris"
              required="required"
              className="form-control"
            />
            <br />
            <label>
            City
              <select ref={cityRef} name="city" required>
                <option value="Paris">Paris</option>
                <option value="Nice">Nice</option>
                <option value="Toulouse">Toulouse</option>
                <option value="Marseille">Marseille</option>
                <option value="Rennes">Rennes</option>
                <option value="Grenoble">Grenoble</option>
                <option value="Nantes">Nantes</option>
                <option value="Montpellier">Montpellier</option>
                <option value="Lyon">Lyon</option>
                <option value="Rouen">Rouen</option>
                <option value="Strasbourg">Strasbourg</option>
                <option value="Nancy">Nancy</option>
                <option value="Metz">Metz</option>
                <option value="Brest">Brest</option>
                <option value="Mulhouse">Mulhouse</option>
                <option value="Limoges">Limoges</option>
                <option value="Orleans">Orleans</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Lille">Lille</option>
                <option value="Le Havre">Le Havre</option>
                <option value="Reims">Reims</option>
                <option value="Saint-Etienne">Saint-Etienne</option>
                <option value="Toulon">Toulon</option>
                <option value="Angers">Angers</option>
                <option value="Nimes">Nimes</option>
                <option value="Clermont-Ferrand">Clermont-Ferrand</option>
                <option value="Le Mans">Le Mans</option>
                <option value="Aix-en-Provence">Aix-en-Provence</option>
                <option value="Amiens">Amiens</option>
                <option value="Tours">Tours</option>
                <option value="Annecy">Annecy</option>
                <option value="Perpignan">Perpignan</option>
                <option value="Besançon">Besançon</option>
                <option value="Pau">Pau</option>
                <option value="La Rochelle">La Rochelle</option>
                <option value="Cannes">Cannes</option>
                <option value="Antibes">Antibes</option>
                <option value="Ajaccio">Ajaccio</option>
                <option value="Quimper">Quimper</option>
                <option value="Clamart">Clamart</option>
                <option value="Frejus">Frejus</option>
                <option value="Bayonne">Bayonne</option>
                <option value="Saint-Malo">Saint-Malo</option>
                <option value="Bastia">Bastia</option>
                <option value="Angouleme">Angouleme</option>
                <option value="Chartres">Chartres</option>
                <option value="Auxerre">Auxerre</option>
                <option value="Orange">Orange</option>
                <option value="Evreux">Evreux</option>
              </select>
              </label>{" "}
            <br />
            <label>
            Address
            </label>
            <input
              rows="4"
              type="text"
              name="address"
              ref={addressRef}
              placeholder="ex: 42 rue du bar"
              required="required"
              pattern=".\d{1,3}\s\w{3,11}\s[A-Za-z']+( [A-Za-z']+)*$"
              className="form-control"
            />
            <br />
            <label>
            Zipcode
            </label>
            <input
              rows="4"
              type="text"
              name="zipcode"
              ref={zipcodeRef}
              placeholder="ex: 75001"
              pattern="^(\d{5})"
              className="form-control"
            />{" "}
            <br />
            <label>
            Average price
            </label>
            <input
              rows="4"
              type="text"
              pattern="^(\d{1,3}\€)"
              name="price"
              ref={priceRef}
              placeholder="ex: 33€"
              className="form-control"
            />{" "}
            <br />
            <label>
            Cuisine
            <hr />
            </label>
            <input
              rows="4"
              type="text"
              name="cuisine"
              ref={cuisineRef}
              pattern="\w+[A-Za-zÀ-ȕ]*"
              placeholder="ex: Française"
              className="form-control"
            />{" "}
            <br />
            <label>
            Phone number
            </label>
            <input
              rows="4"
              type="text"
              pattern="^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$"
              name="phone_number"
              ref={phoneNumberRef}
              placeholder="ex: +331.23 45-6789"
              className="form-control"
            />{" "}
            <br />
            <label>
            Your place has a terrace?
            <input
              rows="4"
              type="checkbox"
              name="terrace"
              ref={terraceRef}
              className="form-check-label m-2"
            /></label>{" "}
            <br />
            <label>
            Number of couvert
            </label>
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="seatnumber"
              ref={seatNumberRef}
              placeholder="ex: 42"
              className="form-control"
            />{" "}
            <br />
            <label>
            Add a short description of your venue
            </label>
            <textarea name="description" ref={descriptionRef} placeholder="describe your venue" required="required" className="form-control" />
            {" "}
            <br />
            <label> Please add one or more photos of your venue<hr /></label>
            <input name="images[]"  type="file" multiple={true} className="form-control-file" />
            <br /><br />
            <input type="submit" value="Create your venue" className="btn-signin" />
            <br />
          </div>
        </form>
      </div>
      {/* ****************************** Alert ********************** */}
      <>
      <Modal show={show} variant="success" align="center">
      <div className="card rounded-5 p-3 m-4" align="center">

        <Alert.Heading> Ops, something went wrong </Alert.Heading>
        <hr />
        <p> Could not create your restaurant. Please try again   </p>
          <Button onClick={() => setShow(false)} variant="outline-danger">
Close      </Button>
</div>

      </Modal>
       </>

       {/* ****************************** Alert ********************** */}
    </div>
    
  );
}

export default CreateVenue;