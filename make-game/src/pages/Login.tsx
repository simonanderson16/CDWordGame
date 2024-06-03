import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
// import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  //   const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => console.log(auth.currentUser), []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
