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
          alert('Your Venue as been created with success !');
          history.push('/');
        } else (alert('Erreur !'));
      })
      .catch(error => console.error('error', error));
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Venue</h3>
          <p>Create your venue.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              ref={nameRef}
              placeholder="What is the name of your establishment ?"
              required="required"
              class="form-control"
            />
            <br />
            <label>
              In what city?
              <select ref={cityRef} name="city">
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
              name="address"
              ref={addressRef}
              placeholder="What is the address of your establishment ?"
              required="required"
              class="form-control"
            />
            <br />
            <input
              rows="4"
              type="text"
              name="zipcode"
              ref={zipcodeRef}
              placeholder="What is the zipcode of your establishment ?"
              class="form-control"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="price"
              ref={priceRef}
              placeholder="What is the average basket of your establishment ?"
              class="form-control"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              name="cuisine"
              ref={cuisineRef}
              placeholder="Do you cook ? If so, what kind ?"
              class="form-control"
            />{" "}
            <br />
            <input
              rows="4"
              type="text"
              pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
              name="phone_number"
              ref={phoneNumberRef}
              placeholder="The phone number of your establishment ?"
              class="form-control"
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
            <input
              rows="4"
              type="text"
              pattern="[0-9]*"
              name="seatnumber"
              ref={seatNumberRef}
              placeholder="How many seats do you have ?"
              class="form-control"
            />{" "}
            <br />
            <textarea name="description" ref={descriptionRef} placeholder="Describe your establishment in a few words" required="required" className="form-control" />
            {" "}
            <br />
            <input name="images[]"  type="file" multiple={true} className="form-control-file" />
            <br />
            <input type="submit" value="Create your Venue" className="btn-signin" />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;