import React, { useContext, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, UserName, setUserName } = useAuth();
  const navigate = useNavigate();

  console.log(UserName);

  //const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }
  console.log(currentUser);
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
            Profile
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>UserName:</strong> {UserName}
          <br />
          <strong>Email:</strong> {currentUser.email || "NA"}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/" style={{ color: "red" }}>
          Log Out
        </Link>
      </div>
    </>
  );
}
