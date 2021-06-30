import "pages/SignUp/SignUp.css";
import SignUpForm from "components/SignUpForm";
import AuthErrorModal from "components/AutErrorModal";
import { useState } from "react";


const SignUp = () => {

  const [show, setShow] = useState();

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Sign Up</h3>
          <p>Create your account</p>
        </div>
        <SignUpForm setShow={setShow} />
      </div>
      <AuthErrorModal show={show} setShow={setShow} />
    </div>
  );
};

export default SignUp;