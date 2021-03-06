import { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
        <form onSubmit={fetchForgotPassword}>
          <div>
          <label>
            Your Email
            </label> 
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="form-control"
            />
            <br />
            <button type="submit"  className="btn-signin">
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