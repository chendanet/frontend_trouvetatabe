import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROD_EDIT_VENUE } from 'api/apiHandler';




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

    return (
        <div className="container-fluid w-100 h-100 container-bg">
            <h2 className="my-5 text-center fw-bold">My Venue(s)</h2>
            <div className="row w-100 d-flex justify-content-center" >
                {venues && venues
                    .filter((value) => value.user_id === parseInt(currentManager.id))
                    .map((item, index) => (
                        <div className="col-md-5 col-xs-12 ms-4 my-2" key={index} style={{ width: "18rem" }}>
                            <Link to={"/venues/" + item.id}>
                                <div className="card" >
                                    <div>
                                        {!item.images[0] ?
                                            <img
                                                src={`https://source.unsplash.com/600x600/?dish&sig=${index}`}
                                                alt={`${item.name}_image`}
                                                className="card-img-top card_img w-100"

                                            />
                                            : <img
                                                src={item.images[0]}
                                                alt={`${item.name}_image`}
                                                className=" card-img-top card_img w-100"

                                            />}


                                        <div className="card_desc">
                                            <h5 className="card_name">{item.name}</h5>
                                            <div className="card_city">{item.city}</div>
                                            <div className="card_cuisine">{item.cuisine}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default MyVenues