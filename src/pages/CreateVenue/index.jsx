import React from 'react';
import { useRef } from 'react';
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
          alert('Génial ! Votre établissement a été créer avec succès 🍹');
          history.push('/myVenues');

        } else (alert('Erreur !'));
      })
      .catch(error => console.error('error', error));
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Creer votre etablissement.</h3>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              ref={nameRef}
              placeholder="ex: Le chiquito"
              required="required"
              className="form-control"
            />
            <br />
            <label>
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
            <input
              rows="4"
              type="text"
              pattern="^(\d{1,3}\€)"
              name="price"
              ref={priceRef}
              placeholder="Panier moyen ? ex: 33€"
              className="form-control"
            />{" "}
            <br />
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
            Une terrasse ?
            <input
              rows="4"
              type="checkbox"
              name="terrace"
              ref={terraceRef}
              className="form-check-label m-2"
            /></label>{" "}
            <br />
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="seatnumber"
              ref={seatNumberRef}
              placeholder="Combien de place assise ? ex: 42"
              className="form-control"
            />{" "}
            <br />
            <textarea name="description" ref={descriptionRef} placeholder="Description de votre etablissement…" required="required" className="form-control" />
            {" "}
            <br />
            <input name="images[]"  type="file" multiple={true} className="form-control-file" />
            <br />
            <input type="submit" value="Creer votre etablissement" className="btn-signin" />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;