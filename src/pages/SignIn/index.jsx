import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [is_manager, setIsManager] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    



    const fetchSignIn = async (e) => {

        const dataUser = {
            user: {
                email: email,
                password: password,
                
            }
        }
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/login", {
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
        const is_manager = data.data.attributes.is_manager

        console.log("data", is_manager);
        
        dispatch(authenticate({
            id: userId,
            email: userEmail,
            is_manager: is_manager
        }, token))

        history.push('/')
    }
    return (
        <div >
            <div>
                <h3>Sign In</h3>
            </div>
            <form >
                <div>
                    <label type="text" name="email">Email</label>
                    <input type="text" name="email" onChange={handleEmail} />
                    <label type="text" name="password">Password</label>
                    <input rows='4' type="password" name="password" onChange={handlePassword} />
                    
                    <button type="submit" onClick={fetchSignIn}>Sign in</button>
                </div>
            </form>
        </div>
    )
}


export default SignIn
