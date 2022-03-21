import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
            Password Reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button
              className="w-100 mt-4"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/" style={{ color: "red" }}>
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ color: "red" }}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
