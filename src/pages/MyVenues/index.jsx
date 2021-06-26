import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROD_EDIT_VENUE } from 'api/apiHandler';
import "pages/MyVenues/MyVenues.css";
// import { SameValueZero } from "es-abstract/es2019";




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
        <div className="col-md-9 col-sm-12 ms-5">
            <div id="titleBloc">
                {currentManager.last_name ? <p className="text-center"><h4 className="nameManager">Dear {currentManager.last_name},</h4>Here you can update your venue(s) ✏️ </p> : <p>Here, your email is : <h4>{currentManager.email}</h4></p>}
            </div>
            <div className="row rowBloc">
                {venues && venues
                    .filter((value) => value.user_id === parseInt(currentManager.id))
                    .map((item, index) => (
                        <div className="col-md-5 col-sm-5 all-imge">
                            <Link to={"/venues/" + item.id} className="col-md-6">
                                <div className="card" key={index}>
                                    <div className="card_imge-container">
                                        {!item.images[0] ?
                                            <img
                                                src={`https://source.unsplash.com/600x600/?dish&sig=${index}`}
                                                alt={`${item.name}_image`}
                                                className="card_imge-container"
                                            />
                                            : <img
                                                src={item.images[0]}
                                                alt={`${item.name}_image`}
                                                className="card_imge-container"
                                            />}
                                    </div>
                                    <div className="card_desc">
                                        <h5 className="cardVenue_name" title={item.name}>{item.name}</h5>
                                        <div className="cardVenue_city">{item.city}</div>
                                        <div className="cardVenue_cuisine">{item.cuisine}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyVenues;