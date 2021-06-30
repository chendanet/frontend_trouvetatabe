import SignInForm from 'components/SignInForm'
import AuthErrorModal from 'components/AutErrorModal'
import { useState } from 'react';

const SignIn = () => {

  const [show, setShow] = useState();

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div>
          <h3>Login</h3>
          <br />
        </div>
        <SignInForm setShow={setShow} />
        <AuthErrorModal show={show} setShow={setShow} />
      </div>
    </div>
  )
}

export default SignIn