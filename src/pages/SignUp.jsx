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
import OAuth from "../components/OAuth";
import signInSVG from "../assets/svg/undraw_access_account_re_8spm.svg";
import avatar from "../assets/svg/undraw_male_avatar_323b.svg";
import wave from "../assets/photos/wave.png";

function SignUp() {
  const inputAnimationStyle = {
    top: "-5px",
    fontSize: "15px",
  };
  const [inputAnimation1, setInputAnimation1] = useState(false);
  const [inputAnimation2, setInputAnimation2] = useState(false);
  const [inputAnimation3, setInputAnimation3] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="sign-page">
      <img className="wave" src={wave} alt="Wave for sign-up page" />

      <div className="container">
        <div className="img">
          <img src={signInSVG} alt="Login SVG (Photo)" />
        </div>

        <div className="login-container">
          <form onSubmit={onSubmit}>
            <img className="avatar" src={avatar} alt="Avatar Photo" />
            <h4>Welcome!</h4>
            <div className="input-div one">
              <div className="i">
                <i className="bi bi-person"></i>
              </div>
              <div>
                <h5 style={inputAnimation1 ? inputAnimationStyle : null}>
                  Username
                </h5>
                <input
                  className="input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  onFocus={() => setInputAnimation1(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation1(false)
                  }
                />
              </div>
            </div>

            <div className="input-div two">
              <div className="i">
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <h5
                  className="email-placeholder"
                  style={inputAnimation2 ? inputAnimationStyle : null}
                >
                  Email
                </h5>
                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  onFocus={() => setInputAnimation2(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation2(false)
                  }
                />
              </div>
            </div>

            <div className="input-div three">
              <div
                className="i"
                onClick={() => setShowPassword((prevState) => !prevState)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
              <div>
                <h5 style={inputAnimation3 ? inputAnimationStyle : null}>
                  Password
                </h5>
                <input
                  className="input"
                  type={showPassword === false ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={onChange}
                  onFocus={() => setInputAnimation3(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation3(false)
                  }
                />
              </div>
            </div>

            <div className="flex">
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password ?
              </Link>
            </div>

            <button type="button" className="sign-btn">
              Sign Up
            </button>

            <div className="sign-footer-container">
              <p>
                Instead<Link to="/sign-in"> Sign In</Link>
              </p>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
