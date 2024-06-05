import { Button } from "@/components/ui/button";
import { auth } from "../../firebase.ts";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import "../styles/Home.css";

const ChangePassword = () => {
  const email = auth.currentUser?.email;
  const [successMessage, setSuccessMessage] = useState<string>("");

  const sendResetEmail = async () => {
    if (email) {
      await sendPasswordResetEmail(auth, email);
    }
    setSuccessMessage("Email sent successfully.");
  };

  return (
    <div>
      <h1 className="font-bold text-xl">Change Password?</h1>
      <p className="mb-5 mt-5">
        An email will be sent to <strong>{email}</strong> prompting you to
        change your password.
      </p>
      <Button onClick={sendResetEmail}>Send Email</Button>
      {successMessage && <p className="success-msg">{successMessage}</p>}
    </div>
  );
};

export default ChangePassword;
