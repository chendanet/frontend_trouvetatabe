import { useSelector } from "react-redux";
import MyVenue from "components/MyVenue";
import { v4 as uuidv4 } from 'uuid'

const MyVenues = ({ venues }) => {

    const currentManager = useSelector((state) => state.authReducer)

    return (
        <div className="container-fluid w-100 h-100 container-bg">
            <h2 className="my-5 text-center fw-bold">My Venue(s)</h2>
            <div className="row w-100 d-flex justify-content-center" >
                {venues && venues
                    .filter((value) => value.user_id === parseInt(currentManager.id))
                    .map((venue) => (
                        <MyVenue venue={venue} key={uuidv4()} />
                    ))}
            </div>
        </div>
    )
}

export default MyVenues