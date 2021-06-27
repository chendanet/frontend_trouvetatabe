/* eslint-disable eqeqeq */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'
import { Link } from "react-router-dom"
import "pages/SignIn/SignIn.css";
import { PROD_SIGNIN } from 'api/apiHandler';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const history = useHistory();
  const [show, setShow] = useState(false);

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
    const response = await fetch(PROD_SIGNIN, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    })


    if (response.status != 200) {
      setShow(true); 
      return
    }

    const token = response.headers.get('Authorization').split('Bearer ')[1]
    const data = await response.json()
    const userId = data.data.id
    const userEmail = data.data.attributes.email
    const is_manager = data.data.attributes.is_manager
    const userFirstName = data.data.attributes.first_name;
    const userLastName = data.data.attributes.last_name;


    dispatch(authenticate({
      id: userId,
      email: userEmail,
      is_manager: is_manager,
      first_name: userFirstName,
      last_name: userLastName
    }, token))

    history.push('/')
  }
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Login</h3>

        </div>
        <form>
          <div>
            <input
              type="text"
              name="email"
              onChange={handleEmail}
              placeholder="Enter Your Email"
              className="form-control"
            />
            <br />
            <input
              rows="4"
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="Enter your Password"
              className="form-control"
            />
            <br />

            <button type="submit" onClick={fetchSignIn} className="btn-signin">
              Login
              </button>

              <>
      <Modal show={show} variant="success" align="center">
      <div className="card rounded-5 p-3 m-4" align="center">

        <Alert.Heading> Ops, sorry </Alert.Heading>
        <hr />
        <p> Could not find email or password. Please try again   </p>
          <Button onClick={() => setShow(false)} variant="outline-danger">
Close      </Button>
</div>

      </Modal>
       </>

              
              <Link to="/password/forgot" className="link-tertiary">Forgot password ?</Link>
           <br />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn