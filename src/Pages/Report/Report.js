import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Attendance = (value, id) => {
  const [sessionid, setSessionid] = useState(id)
  const [show, setShow] = useState(value);
  const [session, setSession] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{sessionid}</Form.Label>
            {/* <Form.Control
              autoFocus
              type="string"
              value={id}
              onChange={(e) => setID(e.target.value)}
            /> */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            {/* <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <Form.File
              className="position-relative"
              required
              name="file"
              label="File"
              multiple
              id="validationFormik107"
              feedbackTooltip
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button variant="primary" type="submit" onClick={requestPwd}>
            Submit
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Form>
  );
};