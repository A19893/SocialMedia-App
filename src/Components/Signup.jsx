import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../Config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  query,
  addDoc,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../Features/AuthSlice";
import Logo from "../Assets/logo.jpeg"
const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //RegisterUser function will add user in our collection and will authenticat it also && it will also check that user should not be registered already.
  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      const user = res.user;
      dispatch(authenticateUser({email,name}));
      await addDoc(collection(db, "Users"), {
        uid: user.uid,
        name: name,
        email: user.email,
        userid: Date.now(),
      });
      navigate("/home");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  //Signingoogle func will let user login or signup also using their gmail account with help of firebase
  const SigninGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
    const email=user.email;
    const name=user.displayName;
    dispatch(authenticateUser({email,name}));
    const q = query(collection(db, "Users"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "Users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        userid: Date.now(),
      });
      navigate("/home");
    } else {
      // console.log("already a registered user")
      navigate("/home");
    }
  };
  return (
    <div className="container">
      <div className="signupcontainer">
        <div className="signupimgcontainer">
          <img
            className="signup-img"
            src="https://i.pinimg.com/564x/be/0b/35/be0b35ef6ed5655dcc602daf4d36c5ae.jpg"
            alt="misssing"
          />
        </div>
        <div className="signupinput">
          <div className="titleImg">
            <img
              className="title-img"
              src={Logo}
              alt="misssing"
            />
          </div>
          <div className="inpdetails">
            <div>
              <input
                type="name"
                placeholder="Name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
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
            <button onClick={RegisterUser}>Sign Up</button>
            <button onClick={SigninGoogle}>Sign Up with Google</button>
            <Link to="/login" className="links">
              Already a Registered User?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
