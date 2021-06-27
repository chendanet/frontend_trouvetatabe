/* eslint-disable react/jsx-no-duplicate-props */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate } from "store/actions";
import "pages/SignUp/SignUp.css";
import { Link } from "react-router-dom";
import { PROD_SIGNUP } from 'api/apiHandler';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_manager, setIsManager] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChange = () => {
      setIsManager(!is_manager);
  };

  const fetchSignUp = async (e) => {
    const dataUser = {
      user: {
        email: email,
        password: password,
        is_manager: is_manager,
      },
    };
    e.preventDefault();
    const response = await fetch(PROD_SIGNUP, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });

    if (response.status !== 200) {
      return;
    }

    const token = response.headers.get("Authorization").split("Bearer ")[1];
    const data = await response.json();
    const userId = data.data.id;
    const userEmail = data.data.attributes.email;
    const isManager = data.data.attributes.is_manager;
    const userFirstName = data.data.attributes.first_name;
    const userLastName = data.data.attributes.last_name;


    dispatch(
      authenticate(
        {
          id: userId,
          email: userEmail,
          is_manager: isManager,
          first_name: userFirstName,
          last_name: userLastName
        },
        token
      )
    );

    history.push("/");
  };
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Sign Up</h3>
          <p>Create your account</p>
        </div>
        <form>
          <div>
            <input
              type="text"
              name="email"
              onChange={handleEmail}
              placeholder="Email: example@example.com"
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              className="form-control"
            />
            <br />
            <input
              rows="4"
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="Enter Password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
              className="form-control"
            />
            <br />
            <input
              rows="4"
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="Confirm your Password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
              className="form-control"
            />{" "}
            <br />
            <div className="check-manager">
              <input
                id="checkbox"
                className="form-check-input"
                type="checkbox"
                value=""
                checked={is_manager}
                onChange={handleOnChange}
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Are you a manager ?
              </label>
            </div>{" "}
            <br />
            <button type="submit" onClick={fetchSignUp} className="btn-signin">
              Sign up
            </button>
            <br />
            <Link to="/login" className="link">
              <button className="btn-login">I have account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;