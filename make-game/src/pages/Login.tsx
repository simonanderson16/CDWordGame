import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.ts";
import { useState } from "react";
import "../styles/Login.css";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { sendPasswordResetEmail } from "firebase/auth";
import { set } from "date-fns";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [resetEmail, setResetEmail] = useState<string>("");
    const [emailSuccessMessage, setEmailSuccessMessage] = useState<string>("");
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

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

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                setEmailSuccessMessage("Password reset email sent");
                setEmailErrorMessage("");
            })
            .catch((error) => {
                setEmailErrorMessage("Error sending password reset email: " + error.message);
                setEmailSuccessMessage("");
            });
    };

    return (
        <div className="login-container">
            <h1 className="login-header">Hoos Spelling: Admin Login</h1>
            <div className="login-card">
                <form onSubmit={onLogin} className="login-form">
                    <Input placeholder="Email" type="email" required onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input placeholder="Password" type="password" required onChange={(e) => setPassword(e.target.value)} className="login-input"></Input>
                    <Button type="submit">Login</Button>
                </form>
            </div>
            {errorMessage && <p className="login-error">{errorMessage}</p>}
            <Dialog>
                <DialogTrigger  className="link">Forgot Password?</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                    </DialogHeader>
                    <p>Please enter the email address associated with your account and we will send you a link to reset your password.</p>
                    <Input placeholder="Email" type="email" required onChange={(e) => setResetEmail(e.target.value)}></Input>
                    <Button onClick={() => handlePasswordReset()}>Send Reset Email</Button>
                    {emailSuccessMessage && <p className="login-success">{emailSuccessMessage}</p>}
                    {emailErrorMessage && <p className="login-error">{emailErrorMessage}</p>}
                </DialogContent>
            </Dialog>
            <p className="made-for">Originally made for</p>
            <img src="cavDailyBanner.png" className="banner" />
            <p className="byline">
                Created by{" "}
                <a className="link" href="mailto:uhx8bu@virginia.edu">
                    Simon Anderson
                </a>
            </p>
        </div>
    );
};

export default Login;
