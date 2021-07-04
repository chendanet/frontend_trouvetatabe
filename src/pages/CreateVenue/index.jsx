import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import "pages/CreateVenue/createVenue.css";
import CreateVenueForm from 'components/CreateVenueForm';


const CreateVenue = () => {


  const [show, setShow] = useState(false);


  return (
    <div className="container-fluid d-flex align-items-center justify-content-center container-bg">
      <div className="form-create-venue">
        <div>
          <h3>Create your venue</h3>
          <hr />
        </div>
        <CreateVenueForm setShow={setShow} />
      </div>
      <>
        <Modal show={show} variant="success" align="center">
          <div className="card rounded-5 p-3 m-4" align="center">
            <Alert.Heading> Ops, something went wrong </Alert.Heading>
            <hr />
            <p> Could not create your restaurant. Please try again   </p>
            <Button onClick={() => setShow(false)} variant="outline-danger">
              Close
            </Button>
          </div>
        </Modal>
      </>
    </div>
  );
}

export default CreateVenue;