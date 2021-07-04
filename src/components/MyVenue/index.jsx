import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

const MyVenue = ({ venue }) => {

    return (
        <div className="col-md-5 col-xs-12 ms-4 my-2" style={{ width: "18rem" }}>
            <Link to={"/venues/" + venue.id}>
                <div className="card" >
                    <div>
                        {!venue.images[0] ?
                            <img
                                src={`https://source.unsplash.com/600x600/?dish&sig=${uuidv4()}`}
                                alt={`${venue.name}_image`}
                                className="card-img-top card_img w-100" />
                            : <img
                                src={venue.images[0]}
                                alt={`${venue.name}_image`}
                                className=" card-img-top card_img w-100" />}
                        <div className="card_desc">
                            <h5 className="card_name">{venue.name}</h5>
                            <div className="card_city">{venue.city}</div>
                            <div className="card_cuisine">{venue.cuisine}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default MyVenue