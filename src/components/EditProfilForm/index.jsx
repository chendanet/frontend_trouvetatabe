import { PROD_PROFILE } from 'api/apiHandler';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authenticate } from 'store/actions'


const EditProfilForm = ({ currentUser, token }) => {

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


    return (
        <div className="form-container">
            <h3> Your profile</h3>
            <p> Here, you can update your profile</p>
            <form onSubmit={updateCurrentUser}>
                <div>
                    <label>
                        E-mail
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Change your Email"
                        size="30"
                        className="form-control" />
                    <label>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Change your Password"
                        className="form-control" />
                    <label>
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your First name"
                        className="form-control" />
                    <label>
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Your Last name"
                        className="form-control" />
                    <br />
                    <button type="submit" className="btn-signin">
                        Modify my profile
                    </button>
                    <br />
                </div>
            </form>
        </div>
    )
}



export default EditProfilForm