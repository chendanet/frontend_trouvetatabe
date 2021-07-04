const VenueBooking = ({ booking, key, DisplayTimeOnly }) => {

    return (
        <div className="card m-2 p-2">
            <h6>{booking.venue.name}</h6>
            <h6> Number of people: <span className=" h6 fw-normal">{booking.seat}</span></h6>
            <h6>Date: <span className=" h6 fw-normal">{booking.date}</span></h6>
            <h6>Time: <span>{DisplayTimeOnly(booking.time)}</span></h6>
        </div>
    )
}



export default VenueBooking