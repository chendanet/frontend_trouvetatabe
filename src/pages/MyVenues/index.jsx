import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import Card from 'react-bootstrap/Card';




const MyVenues = () => {

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
        <Card style={{ width: '180rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Your venue(s)</Card.Title>
                <Card.Text>
                    Here, your information the customers can see :
                </Card.Text>
                {venues && venues
                    .filter((value) => value.user_id === parseInt(currentManager.id))
                    .map((item, index) => (

                        
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
                                />}

                            <Link to={"/venues/" + item.id} className="col-md-5">
                               
                                    <h5>{item.name}</h5>
                                    <p>{item.city}</p>
                                    <p>{item.cuisine}</p>
                                
                            </Link>
                    ))}
            </Card.Body>
        </Card> 
    )
}

export default MyVenues;