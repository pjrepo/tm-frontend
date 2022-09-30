import React, { useState, useEffect } from "react";
import "../utils/Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      setLoading(true);
      await axios.post("/api/auth/login", { email, password });
      setLoading(false);
      navigate("/");
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
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className="txt_field">
          <input type="text" name="email" required />
          <span></span>
          <label htmlFor="email">Email</label>
        </div>
        <div className="txt_field">
          <input type="password" name="password" required />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
        <div className="signup_link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
