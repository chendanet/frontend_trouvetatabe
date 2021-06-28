import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'
import "pages/Profile/Profile.css";
import { logout } from "store/actions";
import { PROD_PROFILE, PROD_BOOKINGS } from 'api/apiHandler';

const Profile = () => {
    const currentUser = useSelector(state => state.authReducer)
    let currentEmail = currentUser.email
    let currentLastName = currentUser.last_name
    let currentFirstName = currentUser.first_name
    let currentPassword = currentUser.password
    const [email, setEmail] = useState(currentEmail)
    const [password, setPassword] = useState(currentPassword)
    const [lastName, setLastName] = useState(currentLastName)
    const [firstName, setFirstName] = useState(currentFirstName)
    const dispatch = useDispatch()
    const history = useHistory()
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)

    const updateCurrentUser = async (e) => {
        e.preventDefault()
        const dataUser = {
            user: {
                email: email,
                password: password,
                last_name: lastName,
                first_name: firstName,
            }
        }

        const response = await fetch(`${PROD_PROFILE}/${currentUser.id}`,
            {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            })
        const data = await response.json()
        const userId = data.id
        const userEmail = data.email
        const is_manager = data.is_manager
        const userFirstName = data.first_name
        const userLastName = data.last_name


        dispatch(authenticate({
            id: userId,
            is_manager: is_manager,
            email: userEmail,
            first_name: userFirstName,
            last_name: userLastName,
        }, token))

        history.push('/profile')
    }


    const [myBooking, setMyBooking] = useState([]);


    useEffect(() => {
        fetch(PROD_BOOKINGS)
            .then((response) => response.json())
            .then((data) => {
                setMyBooking(data)
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


    const fetchDeleteUser = async (e) => {
        e.preventDefault()

        const response = await fetch(
            `${PROD_PROFILE}/${currentUser.id}`,
            {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response) {
            dispatch(logout())
            history.push("/");
        }
    };


    const DisplayTimeOnly = (UTCDateTime) => {
        var date = new Date(UTCDateTime.slice(0, -1));
        var hour = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedDate = hour + ':' + minutes.substr(-2);
        return formattedDate;
    }



    return (
        <div className="container-profil">
            <div className="row justify-content-md-center justify-content-sm-center justify-content-xs-center">
                <div className=" col-md-6 col-sm-6 mt-4 text-center ">
                    {currentUser.last_name ? <p className="text-center"> Hello <span className="fs-6 fw-bold lastName-profile">{currentUser.last_name}</span></p> : <p> Hello, you are connected with: <span className="fs-6 fw-bold email-profile">{currentUser.email}</span></p>}
                </div>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="form-container">
                    <h3> Your profile</h3>
                    <p> Here, you can update your profile</p>
                    <form>
                        <div>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Change your Email"
                                className="form-control" />
                            <br />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Change your Password"
                                className="form-control" />
                            <br />
                            <input
                                type="text"
                                name="first-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Your First name"
                                className="form-control" />
                            <br />
                            <input
                                type="text"
                                name="last-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Your Last name"
                                className="form-control" />
                            <br />
                            <button type="submit" onClick={updateCurrentUser} className="btn-signin">
                                Modify my profile
                        </button>
                            <br />
                        </div>
                    </form>
                </div>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="form-delete mb-5">
                    <h4>Delete my account</h4>
                    <br />
                    <div className="textDelete">
                        <p>Warning: you are about to delete your account : 😱</p>
                        <p> Are you sure ? Deleting your account is permanent and will remove all your advantages and history.</p>
                        <p>Any Bookings you booked will not be deleted automatically. Please go to Restaurants you booked and clic DELETE before deleting your account.</p>
                    </div>
                    <div>
                        <button type="submit" onClick={fetchDeleteUser} className="btn-alert">
                            DELETE
                        </button>
                    </div>
                    <br />
                </div>
            </div>
            <div className="container ">
                <div className="row justify-content-md-center">
                    <h4 className="bloc-bookings col-md-2 ">My bookings : 🍽️ </h4>
                </div>
                <div className="row justify-content-center">
                    {myBooking.map((booking) => (
                        booking.user_id === parseInt(currentUser.id) && (
                            <div className="card col-md-4 rounded-5 p-3 m-4">
                                <h5 className="card-title">{booking.venue.name.toUpperCase()}</h5>
                                <h6> Number of people: <span className="text-dark">{booking.seat}</span></h6>
                                <h6> Date: <span className="text-dark">{booking.date}</span></h6>
                                <h6> Time: <span>{DisplayTimeOnly(booking.time)}</span></h6>
                                <div className="delete-button">
                                    <button alt="trashcan" onClick={() => deleteBooking(booking.id)}> Delete </button>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>


        </div>


    )
}


export default Profile;