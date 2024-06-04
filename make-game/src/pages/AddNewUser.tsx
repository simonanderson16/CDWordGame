import { Button } from "@/components/ui/button";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const createUser = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setErrorMessage("");
      setSuccessMessage("Successfully created account for " + email);
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl">Add a New Admin?</h1>
      <p className="mb-5 mt-5">
        The user will be added as a Hoos Spelling admin and obtain game
        management and user management permissions.
      </p>
      <p className="mb-5">
        Please provide the email of the user you wish to add, along with a
        default password which they will be able to change upon logging in.
      </p>
      <form onSubmit={createUser}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Email"
          className="mb-2"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Label htmlFor="password">Default Password</Label>
        <Input
          id="password"
          placeholder="Default Password"
          className="mb-5"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button type="submit">Create Admin</Button>
      </form>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
      {successMessage && <p className="success-msg">{successMessage}</p>}
    </div>
  );
};

export default AddNewUser;
