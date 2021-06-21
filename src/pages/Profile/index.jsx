import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'
import "pages/Profile/Profile.css";
import { logout } from "store/actions";


const Profile = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.authReducer)
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

        const response = await fetch(`https://trouvetatableapi.herokuapp.com/api/users/${currentUser.id}`,
            {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            })

        // const data = await response.json()
        currentUser.email = email
        dispatch(authenticate({
            id: currentUser.id,
            email: email || localStorage.getItem(config.LOCAL_STORAGE_KEY).email,
            last_name: lastName,
            first_name: firstName,
        }, token))
        
        // console.log(data)
        history.push('/')
    }
    console.log("currentUser:" , currentUser);
    

    // ************* add booking for profil **************

    const [myBooking, setMyBooking] = useState([]);
    const URL = "https://trouvetatableapi.herokuapp.com/api/bookings";


    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setMyBooking(data)
            });
    }, [])

    // ***************** add delete booking *************

    const deleteBooking = async (id) => {
        fetch(`https://trouvetatableapi.herokuapp.com/api/bookings/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        history.push("/");
    }

    // ***************** add delete user *************


    const fetchDeleteUser = async (e) => {
        e.preventDefault()

        const response = await fetch(
            `https://trouvetatableapi.herokuapp.com/api/users/${currentUser.id}`,
            {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(logout())
        history.push("/");
    };


    return (
        <>
            <div className="identityProfil text-center">
                {currentUser.last_name ? <p>Bonjour,<h4>{currentUser.last_name}</h4></p> : <p>Bonjour, vous êtes connecté sous : <h4>{currentUser.email}</h4></p>}
                
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="form-container">
                    <div className="form-container">
                        <h3>Mon profil</h3>
                        <p>Ici, vous pouvez modifier votre profil en entier :</p>
                    </div>
                    <form>
                        <div>
                            <input
                                type="text"
                                name="email"

                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Modifier email" />
                            <br />
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Modifier MDP" />
                            <br />
                            <input
                                type="text"
                                name="last-name"
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Votre Prénon" />
                            <br />
                            <input
                                type="text"
                                name="first-name"
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Votre Nom" />
                            <br />
                            <button type="submit" onClick={updateCurrentUser} className="btn-signin">
                                Modifier mon profil
                        </button>
                            <br />
                        </div>
                    </form>
                </div>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="form-delete">

                    <h3>Supprimer votre compte</h3>
                    <br />
                    <p>ATTENTION: Vous êtes sur le point de supprimer votre compte : 😱 </p>
                    <div>
                        <button type="submit" onClick={fetchDeleteUser} className="btn-alert">
                            SUPPRIMER
                            </button>
                    </div>
                    <br />
                </div>
            </div>
            <div className="container ">
                <h3>My bookings</h3>
                {myBooking.map((booking) => (

                    booking.user_id == currentUser.id && (
                        <div className="card m-2 p-2 d-flex align-items-center justify-content-center">
                            <h2>{booking.venue.name}</h2>
                            <h4>seat:</h4>
                            <span>{booking.seat}</span>
                            <h4>Date:</h4>
                            <span>{booking.date}</span>
                            <h4>Time:</h4>
                            <span>{booking.time}</span>
                            <div className="delete-button">
                                <button alt="trashcan" onClick={() => deleteBooking(booking.id)}> Supprimer </button>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </>


    )
}


export default Profile;





