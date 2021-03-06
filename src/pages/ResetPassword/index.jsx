import { useState } from 'react'
import { useHistory, useParams} from 'react-router-dom'

const ResetPassword = () => {
  
  const { token } = useParams()
  const history = useHistory();
  const [password, setPassword] = useState();

  const data  = {
    password: password,
    token: token,
  };

  const fetchResetPassword = async (e) => {
    e.preventDefault();

    const response = await fetch("https://trouvetatableapi.herokuapp.com/password/reset", {

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
          <h3> Enter your new password </h3>
          <br />
        </div>
        <form>
          <div>
          <label>
            New Password
            </label> 
            <input
              type="password"
              name="email"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your new password"
              className="form-control"

            />
            <br />
            <button type="submit" onClick={fetchResetPassword} className="btn-signin">
              Submit 
              </button>
            <br />
          </div>
        </form>
      </div>
    </div>
  )
}


export default ResetPassword