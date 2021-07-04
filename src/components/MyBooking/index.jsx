const MyBooking = ({ booking, DisplayTimeOnly, deleteBooking, currentUser }) => {
    return (
        <>
            {booking.user_id === parseInt(currentUser.id) && (
                <div className="card col-md-4 rounded-5 p-3 m-4">
                    <h5 className="card-title">{booking.venue.name.toUpperCase()}</h5>
                    <h6> Number of people: <span className="text-dark">{booking.seat}</span></h6>
                    <h6> Date: <span className="text-dark">{booking.date}</span></h6>
                    <h6> Time: <span>{DisplayTimeOnly(booking.time)}</span></h6>
                    <div className="delete-button">
                        <button alt="trashcan" onClick={() => deleteBooking(booking.id)}> Delete </button>
                    </div>
                </div>
            )}
        </>
    )
}





export default MyBooking