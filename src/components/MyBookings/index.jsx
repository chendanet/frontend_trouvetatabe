import { useState, useEffect } from "react";
import { PROD_BOOKINGS } from 'api/apiHandler';
import { useHistory } from "react-router";
import MyBooking from "components/MyBooking";
import { v4 as uuidv4 } from 'uuid'



const MyBookings = ({ currentUser, token }) => {

    const [myBooking, setMyBooking] = useState([]);
    const [emptyBookings, setEmptyBookings] = useState()
    const history = useHistory()

    useEffect(() => {
        fetch(PROD_BOOKINGS)
            .then((response) => response.json())
            .then((data) => {
                setMyBooking(data)
                setEmptyBookings(data)

            });
    }, [])

    const deleteBooking = async (id) => {
        fetch(`${PROD_BOOKINGS}/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        history.push("/");
    }

    const DisplayTimeOnly = (UTCDateTime) => {
        var date = new Date(UTCDateTime.slice(0, -1));
        var hour = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedDate = hour + ':' + minutes.substr(-2);
        return formattedDate;
    }

    let emptyBooking = emptyBookings && currentUser && emptyBookings.filter((booking) => booking.user_id === parseInt(currentUser.id))


    return (
        <>
            <div className="row my-5 d-flex justify-content-center w-100">
                <h4 className="text-center"> My bookings </h4>
            </div>
            <div className="row justify-content-center">
                {myBooking.map((booking) => (
                    <MyBooking booking={booking} key={uuidv4()} DisplayTimeOnly={DisplayTimeOnly} deleteBooking={deleteBooking} currentUser={currentUser} />
                ))}
                {emptyBooking && emptyBooking.length === 0 &&
                    <p className="text-center">  You don't have any booking yet</p>}
            </div>
        </>
    )
}



export default MyBookings