import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'
import { Link } from "react-router-dom"
import "pages/Profile/Profile.css";


const Profile = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.authReducer)
    const history = useHistory()
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)


    const updateCurrentUser = async (e) => {
        e.preventDefault()
        const dataUser = {
            user: {
                email: email,
                password: password
            }
        }
        console.log('token', token)

        const response = await fetch(`http://localhost:3000/api/users/${currentUser.id}`,
            {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            })

       

        const data = await response.json()
        console.log(data)
        currentUser.email = email
        dispatch(authenticate({
            id: currentUser.id,
            email: email,
        }, token))
        history.push('/')
    }


    return (
        <>
            <div className="identityProfil">
                <p>Bonjour, vous êtes connecté sous : <h4>{currentUser.email}</h4></p>
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
                    placeholder="Modifier email"/>
                <br/>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Modifier MDP"/>
                    <br/>
                        <button type="submit" onClick={updateCurrentUser} className="btn-signin">
                            Modifier mon profil
                        </button>
                    <br/>
                </div>
                </form>
            </div>
            </div>  
            <div className="container d-flex align-items-center justify-content-center">
                <div className="form-delete">
                    
                        <h3>Supprimer votre compte</h3>
                        <br/>
                        <p>ATTENTION: Vous êtes sur le point de supprimer votre compte : 😱 </p>
                        <div>
                            <button type="submit" onClick={updateCurrentUser} className="btn-alert">
                                        SUPPRIMER
                            </button>
                        </div>
                        <br/>
                </div>  
            </div> 
        </>


    )
}


export default Profile;


