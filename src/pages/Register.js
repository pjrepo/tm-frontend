import React, { useState, useEffect } from "react";
import "../utils/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();
    const user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      setLoading(true);
      await axios.post("/api/auth/register", user);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className="center">
      {loading && <Spinner />}
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <div className="txt_field">
          <input type="text" name="username" required />
          <span></span>
          <label htmlFor="username">Username</label>
        </div>
        <div className="txt_field">
          <input type="email" name="email" required />
          <span></span>
          <label htmlFor="email">Email</label>
        </div>
        <div className="txt_field">
          <input type="password" name="password" required />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="register" />
        <div className="signup_link">
          Already a user? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
