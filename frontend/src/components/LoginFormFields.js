import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./LoginFormFields.module.css";

const LoginFormFields = ({ className = "" }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        name,
        email,
        gender,
        age,
        phoneNo,
        password,
      });
      console.log("Registration successful:", response.data);
      navigate("/homepage-after-sign-up-or-login");
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.error);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  const onPrimaryClick = useCallback(() => {
    navigate("/homepage-after-sign-up-or-login");
  }, [navigate]);

  const onPrimaryClick1 = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  return (
    <div className={[styles.loginFormFields, className].join(" ")}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pho
