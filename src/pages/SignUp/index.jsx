import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [is_manager, setIsManager] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleOnChange = () => {
        {
            setIsManager(!is_manager)
        }
    }



    const fetchSignUp = async (e) => {

        const dataUser = {
            user: {
                email: email,
                password: password,
                is_manager: is_manager
            }
        }
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/signup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })


        if (response.status !== 200) {

            return
        }

        const token = response.headers.get('Authorization').split('Bearer ')[1]
        const data = await response.json()
        const userId = data.data.id
        const userEmail = data.data.attributes.email
        const isManager = data.data.attributes.is_manager
        console.log('here', isManager)

        dispatch(authenticate({
            id: userId,
            email: userEmail,
            is_manager: isManager
        }, token))

        history.push('/')
    }
    return (
        <div >
            <div>
                <h3>Sign Up</h3>
            </div>
            <form >
                <div>
                    <label type="text" name="email">Email</label>
                    <input type="text" name="email" onChange={handleEmail} />
                    <label type="text" name="password">Password</label>
                    <input rows='4' type="password" name="password" onChange={handlePassword} />
                    <input id="checkbox" class="form-check-input" type="checkbox" value="" checked={is_manager} onChange={handleOnChange} id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">Are you a manager</label>
                    <button type="submit" onClick={fetchSignUp}>Sign up</button>
                </div>
            </form>
        </div>
    )
}


export default SignUp