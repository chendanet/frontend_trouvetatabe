import { useRef } from "react";
import { PROD_CREATE_VENUE } from 'api/apiHandler'
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import config from 'config';



const CreateVenueForm = ({ setShow }) => {

    const cities = ["Aix-en-Provence", "Ajaccio", "Auxerre", "Amiens", "Angers", "Angouleme", "Annecy", "Antibes", "Bastia", "Bayonne", "Besançon", "Bordeaux", "Brest", "Cannes", "Chartres", "Clamart", "Clermont-Ferrand", "Evreux", "Frejus", "Grenoble", "La Rochelle", "Le Havre", "Le Mans", "Lille", "Limoges", "Lyon", "Marseille", "Metz", "Montpellier", "Mulhouse", "Nancy", "Nantes", "Nice", "Nimes", "Orange", "Orleans", "Paris", "Pau", "Perpignan", "Quimper", "Reims", "Rennes", "Rouen", "Saint-Etienne", "Saint-Malo", "Strasbourg", "Toulon", "Toulouse", "Tours"]
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
                    history.push('/myVenues');
                } else {
                    setShow(true);
                    return
                }
            })
            .catch(error => console.error('error', error));
    }

    return (
        <form onSubmit={handleSubmit} keyboard="false" dblclick="false">
            <div>
                <label className="fw-bold">
                    Venue name
                 </label>
                <input
                    type="text"
                    name="name"
                    ref={nameRef}
                    placeholder="ex: Le Paris"
                    required="required"
                    className="form-control" />
                <br />
                <label className="fw-bold">
                    City
                </label>
                <select ref={cityRef} name="city" required className="form-select">
                    {cities.map((city) => {
                        return <option value={city}>{city}</option>
                    })}
                </select>
                <br />
                <label className="fw-bold">
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
                    className="form-control" />
                <br />
                <label className="fw-bold">
                    Zipcode
                </label>
                <input
                    rows="4"
                    type="text"
                    name="zipcode"
                    ref={zipcodeRef}
                    placeholder="ex: 75001"
                    pattern="^(\d{5})"
                    required="required"
                    className="form-control" />{" "}
                <br />
                <label className="fw-bold">
                    Average price
                </label>
                <input
                    rows="4"
                    type="text"
                    pattern="^(\d{1,3}\€)"
                    name="price"
                    ref={priceRef}
                    placeholder="ex: 33€"
                    required="required"
                    className="form-control" />{" "}
                <br />
                <label className="fw-bold">
                    Cuisine
                </label>
                <input
                    rows="4"
                    type="text"
                    name="cuisine"
                    ref={cuisineRef}
                    pattern="\w+[A-Za-zÀ-ȕ]*"
                    placeholder="ex: Française"
                    className="form-control" />{" "}
                <br />
                <label className="fw-bold">
                    Phone number
                </label>
                <input
                    rows="4"
                    type="text"
                    pattern="^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$"
                    name="phone_number"
                    ref={phoneNumberRef}
                    placeholder="ex: +331.23 45-6789"
                    required="required"
                    className="form-control" />{" "}
                <br />
                <label className="fw-bold">
                    Your place has a terrace?
                </label>{" "}
                <input
                    rows="4"
                    type="checkbox"
                    name="terrace"
                    ref={terraceRef}
                    className="form-check-label m-2" />
                <br />
                <label className="fw-bold">
                    Number of couvert
                </label>
                <input
                    rows="4"
                    type="text"
                    pattern="[0-9]*"
                    name="seatnumber"
                    ref={seatNumberRef}
                    placeholder="ex: 42"
                    required="required"
                    className="form-control" />{" "}
                <br />
                <label className="fw-bold">
                    Add a short description of your venue
                </label>
                <textarea name="description" ref={descriptionRef} placeholder="describe your venue" required="required" className="form-control" />
                {" "}
                <br />
                <label className="fw-bold">
                    Please add one or more photos of your venue<hr />
                </label>
                <input name="images[]" type="file" multiple={true} className="form-control" />
                <br /><br />
                <input type="submit" value="Create your Venue" className="btn-signin" />
                <br />
            </div>
        </form>
    )
}


export default CreateVenueForm