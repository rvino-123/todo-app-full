import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="container">
      <div className="app-banner"></div>
      <div className="loginCard">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor=""></label>
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
            <Link to={"/register"}>Register Instead</Link>
          </div>

          <div className="form-control">
            <button className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Photo by <a href="https://unsplash.com/@alifcaesar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alif Caesar Rizqi Pratama</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default Login;
