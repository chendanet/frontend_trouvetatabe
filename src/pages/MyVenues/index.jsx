import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import Card from 'react-bootstrap/Card';
import { SameValueZero } from "es-abstract/es2019";




const MyVenues = (item, index) => {

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
        <Card style={{ width: '50rem' }} key={index}>
          
            {!item.images[0] ?
                <img
                    src={`https://source.unsplash.com/600*600/?dish&sig=${index}`}
                    alt={`${item.name}_image`}
                />
                :
                <img
                    src={item.images[0]}
                    alt={`${item.name}_image`}
                />
            }
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                   <Link to={"/venues/" + item.id}>
                       <p>{item.city}</p>
                       <p>{item.cuisine}</p>

                   </Link>
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default MyVenues;