import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Register } from "./RegisterForm";
import { Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [id, setID] = useState("");
  const [isAuthentication, setIsAuthentication] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function requestPwd(event) {
    setShow(false);
    const url = "http://localhost:8000/api/lecturers/".concat(id);
    const response = await axios(url);
    console.log(typeof response.data);
    setData(response.data);
    console.log(data);
  }
  const history = useHistory();

  const routeChange = () => {
    let path = `/dashboard`;
    history.push(path);
  };

  async function login(event) {
    const url = "http://localhost:8000/api/authentication";
    const response = await axios({
      method: "post",
      url: url,
      data: {
        email: email,
        pwd: password,
      },
    });
    console.log(response.data);
    if (response.data === true) {
      localStorage.setItem("authentication", response.data);
      routeChange();
    } else {
      alert("Login Error");
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <button className="btn btn-register" onClick={handleShow}>
            Register
          </button>
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={login}
        >
          Login
        </Button>
      </Form>
      <Form onSubmit={requestPwd}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Lecturer ID</Form.Label>
              <Form.Control
                autoFocus
                type="string"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={requestPwd}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};
