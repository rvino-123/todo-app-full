import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuid4 } from "uuid";

function Register() {
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
      console.log(formDataCopy);
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
    <div className="container">
      <div className="app-banner"></div>
      <div className="loginCard">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Joe Smith"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="joe@example.com"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </div>
          <div className="form-control">
            <Link to={"/login"}>Login Instead</Link>
          </div>
          <div className="form-control">
            <button className="btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Photo by <a href="https://unsplash.com/@alifcaesar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alif Caesar Rizqi Pratama</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default Register;
