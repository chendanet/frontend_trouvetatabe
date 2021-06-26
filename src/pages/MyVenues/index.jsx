import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import Card from 'react-bootstrap/Card';
import { SameValueZero } from "es-abstract/es2019";




const MyVenues = (venue, item, index) => {

    const [venues, setVenues] = useState(undefined);

useEffect(() => {
  fetch(PROD_EDIT_VENUE)
    .then((response) => response.json())
    .then((data) => {
      setVenues(data)
    });
}, [])

    const currentManager = useSelector((state) => state.authReducer)
    console.log('venues', venues)
    console.log('venues', currentManager)

    return (
        {venues && venues
            .filter((value) => value.user_id === parseInt(currentManager.id))
            .map((item, index) => (
        <Card>
            {!item.images[0] ?
                <img
                    src={`https://source.unsplash.com/600x600/?dish&sig=${index}`}
                    alt={`${item.name}_image`}
                    className="img-fluid card-border"
                />
                : <img
                    src={item.images[0]}
                    alt={`${item.name}_image`}
                    className="img-fluid card-border"
                />
            }
           
            <Card.Body>
                <Card.Title>Your venue(s)</Card.Title>
                <Card.Text>
                    
                            <Link to={"/venues/" + item.id} className="col-md-5">
                                <h5>{venue.name}</h5>
                                <p>{venue.city}</p>
                                <p>{venue.cuisine}</p>
                            </Link>
                       
                </Card.Text>
            </Card.Body>
        </Card> 
         ))}
    )
}

export default MyVenues;