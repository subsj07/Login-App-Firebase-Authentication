import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, UserName, setUserName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkName, setCheckName] = useState();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      toast.success(
        "Congrats, you have been sign in sucessfully. please login now",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card
        style={{
          borderWidth: ".1rem",
          borderColor: "red",
          borderRadius: "2rem",
          padding: "5%",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "red" }}>
            SIGNUP
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                placeholder="Enter UserName"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                placeholder="Confirm Password"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button
              className="w-100  mt-4"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ color: "red" }}>
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
}
