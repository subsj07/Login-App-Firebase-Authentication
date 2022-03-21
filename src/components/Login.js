import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default function Login() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      toast.success("You have login sucessfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      navigate("/dashboard");
    } catch {
      setError("Failed to login");
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
            ADMIN LOGIN
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password" style={{ color: "red" }}>
                Forgot Password?
              </Link>
            </div>
            <Button
              className="w-100 mt-4"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ color: "red" }}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
