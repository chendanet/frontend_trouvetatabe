import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'




const Venue = ({ venue }) => {

    return (
        <div className="col-md-4 col-sm-6">
            <Link to={"/venues/" + venue.id} className="col-md-6">
                <div className="card" >
                    <div className="card_img-container ">
                        {!venue.images[0] ?
                            <img
                                src={`https://source.unsplash.com/600x600/?dish&sig=${uuidv4()}`}
                                alt={`${venue.name}_image`}
                                className="card_img"
                            />
                            : <img
                                src={venue.images[0]}
                                alt={`${venue.name}_image`}
                                className="card_img"
                            />}
                    </div>
                    <div className="card_desc">
                        <h5 className="card_name" title={venue.name}>{venue.name}</h5>
                        <div className="card_city">{venue.city}</div>
                        <div className="card_cuisine">{venue.cuisine}</div>
                        <div className="card_price">{Math.floor(venue.price * 0.90)} € instead of {venue.price} €</div>
                        <button className="card_btn">View details</button>
                    </div>
                </div>
            </Link>
        </div>
    )
}



export default Venue