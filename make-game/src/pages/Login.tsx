import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
// import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Login.css";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";

const Login = () => {
  //   const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Hoos Spelling: Admin Login</h1>
      <div className="login-card">
        <form onSubmit={onLogin} className="login-form">
          <Input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          ></Input>
          <Button type="submit">Login</Button>
        </form>
      </div>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <p className="made-for">Originally made for</p>
      <img src="cavDailyBanner.png" className="banner" />
      <p className="byline">
        Created by{" "}
        <a className="email-link" href="mailto:uhx8bu@virginia.edu">
          Simon Anderson
        </a>
      </p>
    </div>
  );
};

export default Login;
