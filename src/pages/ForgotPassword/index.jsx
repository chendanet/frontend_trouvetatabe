import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'
import "pages/SignIn/SignIn.css";

const ForgotPassword = () => {

  const history = useHistory();
  const [email, setEmail] = useState();

  const data  = {
    email: email,
  };

  const fetchForgotPassword = async (e) => {
    e.preventDefault();

    const response = await fetch("https://trouvetatableapi.herokuapp.com/password/forgot", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response) {
        history.push("/");
        return;
      }
  }
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3> Enter your email </h3>
          <br />
        </div>
        <form>
          <div>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <br />
            <button type="submit" onClick={fetchForgotPassword} className="btn-signin">
              Enter your email
              </button>
            <br />
          </div>
        </form>
      </div>
    </div>
  )
}


export default ForgotPassword