import { PROD_BOOKINGS } from "api/apiHandler";
import { useState, useEffect } from "react";
import Booking from "components/Booking";
import { v4 as uuidv4 } from 'uuid'


const ListBooking = ({ currentVenue }) => {

    const [bookings, setBookings] = useState([])
    const [emptyBookings, setEmptyBookings] = useState()


    let emptyBooking = emptyBookings && currentVenue && emptyBookings.filter((booking) => booking.venue_id === currentVenue.id)
    const fetchAllBookings = async () => {
        const response = await fetch(PROD_BOOKINGS);
        const data = await response.json();
        setBookings(data);
        setEmptyBookings(data)
    };

    const DisplayTimeOnly = (UTCDateTime) => {
        var date = new Date(UTCDateTime.slice(0, -1));
        var hour = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedDate = hour + ':' + minutes.substr(-2);
        return formattedDate;
    }

    useEffect(() => {
        fetchAllBookings();
    }, []);
    return (
        <>
            <h4 className="text-center"> {currentVenue.name} list of all bookings </h4>
            {bookings &&
                bookings
                    .filter(
                        (booking) => booking.venue_id === currentVenue.id
                    )
                    .map((booking) => (
                        <div className="col-md-5 col-xs-12 ms-4 my-2" key={booking.id}>
                            <Booking booking={booking} key={uuidv4()} DisplayTimeOnly={DisplayTimeOnly} />
                        </div>
                    )
                    )}

            {emptyBooking && emptyBooking.length === 0 &&
                <p className="text-center">This venue doesn't have any booking yet</p>}
        </>
    )
}


export default ListBooking