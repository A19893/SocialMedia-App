import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../Config/Firebase";
import { authenticateUser } from "../Features/AuthSlice";
import Logo from "../Assets/logo.jpeg"
const Signin = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginUser = (e) => {
    try {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch(authenticateUser({email,name}));
          navigate("/home");
        }
      );
    } catch (err) {
      alert("User Credentials Not Valid!!");
      console.log(err.message);
    }
  };
  return (
    <div className="container">
      <div className="signupcontainer">
        <div className="signupimgcontainer">
          <img
            className="signup-img"
            src="https://i.pinimg.com/564x/c5/05/75/c50575618bfd23dafcfa4a8ad3f4d101.jpg"
            alt="misssing"
          />
        </div>
        <div className="loginInput">
          <div className="titleInput">
            <h1>Welcome Back</h1>
            <div className="loginImg">
              <img
                className="login-img"
                src={Logo}
                alt="misssing"
              />
            </div>
          </div>
          <div className="inpdetails">
              <input
                type="name"
                placeholder="Name"
                onChange={(e) => setname(e.target.value)}
              />
            <input
              type="email"
              placeholder=" Mail"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder=" Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={LoginUser}>Login</button>
            <Link to="/" className="links">
              Not a Registered User?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
