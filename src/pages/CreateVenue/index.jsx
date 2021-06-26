import React, { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import config from 'config';
import { useHistory } from 'react-router-dom';
import { PROD_CREATE_VENUE} from 'api/apiHandler'


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
  const [alert, setAlert] = useState(false);
  
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
          setAlert(false);
          history.push('/myVenues');

        } else {
          setAlert(true);
          return;
        }
      })
      .catch(error => console.error('error', error));
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Create your establishment.</h3>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name of the restaurant ?
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
            In what city ?
              <select ref={cityRef} name="city" required>
              <option value="Aix-en-Provence">Aix-en-Provence</option>
              <option value="Ajaccio">Ajaccio</option>
                <option value="Auxerre">Auxerre</option>
                <option value="Amiens">Amiens</option>
                <option value="Angers">Angers</option>
                <option value="Angouleme">Angouleme</option>
                <option value="Annecy">Annecy</option>
                <option value="Antibes">Antibes</option>
                <option value="Bastia">Bastia</option>
                <option value="Bayonne">Bayonne</option>
                <option value="Besançon">Besançon</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Brest">Brest</option>
                <option value="Cannes">Cannes</option>
                <option value="Chartres">Chartres</option>
                <option value="Clamart">Clamart</option>
                <option value="Clermont-Ferrand">Clermont-Ferrand</option>
                <option value="Evreux">Evreux</option>
                <option value="Frejus">Frejus</option>
                <option value="Grenoble">Grenoble</option>
                <option value="La Rochelle">La Rochelle</option>
                <option value="Le Havre">Le Havre</option>
                <option value="Le Mans">Le Mans</option>
                <option value="Lille">Lille</option>
                <option value="Limoges">Limoges</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
                <option value="Metz">Metz</option>
                <option value="Montpellier">Montpellier</option>
                <option value="Mulhouse">Mulhouse</option>
                <option value="Nancy">Nancy</option>
                <option value="Nantes">Nantes</option>
                <option value="Nice">Nice</option>
                <option value="Nimes">Nimes</option>
                <option value="Orange">Orange</option>
                <option value="Orleans">Orleans</option>
                <option value="Paris">Paris</option>
                <option value="Pau">Pau</option>
                <option value="Perpignan">Perpignan</option>
                <option value="Quimper">Quimper</option>
                <option value="Reims">Reims</option>
                <option value="Rennes">Rennes</option>
                <option value="Rouen">Rouen</option>
                <option value="Saint-Etienne">Saint-Etienne</option>
                <option value="Saint-Malo">Saint-Malo</option>
                <option value="Strasbourg">Strasbourg</option>
                <option value="Toulon">Toulon</option>
                <option value="Toulouse">Toulouse</option>
                <option value="Tours">Tours</option>
              </select>
              </label>{" "}
            <br />
            <label>
            At what address ?
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
            What is the zipcode ?
            </label>
            <input
              rows="4"
              type="text"
              name="zipcode"
              ref={zipcodeRef}
              placeholder="ex: 75001"
              pattern="^(\d{5})"
              required="required"
              className="form-control"
            />{" "}
            <br />
            <label>
            What is the average basket ?
            </label>
            <input
              rows="4"
              type="text"
              pattern="^(\d{1,3}\€)"
              name="price"
              ref={priceRef}
              placeholder="ex: 33€"
              required="required"
              className="form-control"
            />{" "}
            <br />
            <label>
            What cuisine ?
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
            What is the phone number ?
            </label>
            <input
              rows="4"
              type="text"
              pattern="^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$"
              name="phone_number"
              ref={phoneNumberRef}
              placeholder="ex: +331.23 45-6789"
              required="required"
              className="form-control"
            />{" "}
            <br />
            <label>
            Have a terrace ?
            <input
              rows="4"
              type="checkbox"
              name="terrace"
              ref={terraceRef}
              className="form-check-label m-2"
            /></label>{" "}
            <br />
            <label>
            How much seating space do you have ?
            </label>
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="seatnumber"
              ref={seatNumberRef}
              placeholder="ex: 42"
              required="required"
              className="form-control"
            />{" "}
            <br />
            <label>
            What do you offer in your establishment ?
            </label>
            <textarea name="description" ref={descriptionRef} placeholder="Craft cocktails with the freshest seasonal ingredients…" required="required" className="form-control" />
            {" "}
            <br />
            <label>Some pictures of your establishment ?<hr /></label>
            <input name="images[]"  type="file" multiple={true} className="form-control-file" required />
            <br /><br />
            <input type="submit" value="Create your establishment" className="btn-signin" />
            <br />
            {
              alert && setAlert() === true ? 
                (<div className="alert alert-primary" role="alert">
                  Whoops, something was wrong, please check try again 
                </div>)
              :
                (<div className="alert alert-success" role="alert">
                  Awesome ! Your etablishment has been successfully created 🍹
                </div>
                )
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;