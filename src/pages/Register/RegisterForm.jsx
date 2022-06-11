import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CardTitle,
  StyledButton,
  StyledCard,
  StyledInput,
  StyledLabel,
} from "./styles";

function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, name, password, password2 } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = {
        ...formData,
        isAllowedEmailNotifications: false,
        isAllowedWebNotifications: false,
      };

      delete formDataCopy.password;
      delete formDataCopy.password2;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration.");
    }
  };

  return (
    <StyledCard>
      <CardTitle>Register</CardTitle>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "1.2rem", marginBottom: "1rem" }}>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            id="name"
            value={email}
            onChange={handleChange}
            placeholder="joe@example.com"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="joe@example.com"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your Password"
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={handleChange}
            placeholder="Enter your Password"
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <StyledButton>Log In</StyledButton>
        </div>
      </form>
      <Link to={"/login"}>Login Instead</Link>
    </StyledCard>
  );
}

export default LoginForm;
