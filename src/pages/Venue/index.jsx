import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import Cookies from 'js-cookie'
import config from 'config'

const Venue = ({venues}) => {
  const { idVenue } = useParams();
  const [currentVenue, setCurrentVenue] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY)
  const [name, setName] = useState()
  const [city, setCity] = useState()
  const [cuisine, setCuisine] = useState()

  const history = useHistory()
  const currentUser = useSelector((state) => state.authReducer);
  const dataVenue = {
    venue: {
      name: name,
      city: city,
      cuisine: cuisine,
    }
  }

  const fetchEditVenue = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/api/venues/${idVenue}`,
      {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataVenue)
      })

    if (response) {
      history.push('/')
      return
    }

    const data = await response.json()
    console.log('data', data)
  }
  const fetchDeleteVenue = async () => {
    const response = await fetch(`http://localhost:3000/api/venues/${idVenue}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    history.push('/')
  }


  useEffect(() => {
    fetch(`http://localhost:3000/api/venues/${idVenue}`)
      .then((response) => response.json())
      .then((data) => setCurrentVenue(data));
  }, [idVenue]);

  const body = (
    <div>
      <div>
        <h3>Edit Venue</h3>
      </div>
      <form>
        <div>
          <label type="text" name="username">Name</label>
          <input type="text" name="name" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label type="text" name="city"> City </label>
          <textarea rows='4'  type="text" name="city" onChange={(e) => setCity(e.target.value)}></textarea>
        </div>
        <div>
          <label type="text" name="cuisine"> Cuisine </label>
          <input type="number" name="cuisine" onChange={(e) => setCuisine(e.target.value)}></input>
        </div>
        <div>

          <button type="submit" onClick={fetchEditVenue}>Update</button>
        </div>
      </form>
    </div>
  );
  return (
    <div >
    <div className="form-container">
      <div>
        {currentVenue && (
          <div>
            <img            />
            <h2>{currentVenue.name}</h2>
            <p>{currentVenue.city}</p>
            <h6>{currentVenue.cuisine}</h6>       
              {(currentUser.id == currentVenue.user.id) &&
                <div>
                  <div>
                    <button type="button" >
                      Edit
                    </button>
                  </div>
                  <button onClick={fetchDeleteVenue}>Delete</button>
                </div>}
          </div>
        )}
    </div>
    </div>
    </div>


  );

};

export default Venue;