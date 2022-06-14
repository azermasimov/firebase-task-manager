import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import signInSVG from "../assets/svg/undraw_access_account_re_8spm.svg";
import avatar from "../assets/svg/undraw_male_avatar_323b.svg";
import wave from "../assets/photos/wave.png";

function SignIn() {
  const inputAnimationStyle = {
    top: "-5px",
    fontSize: "15px",
  };
  const [inputAnimation1, setInputAnimation1] = useState(false);
  const [inputAnimation2, setInputAnimation2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (err) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="sign-page">
      <img className="wave" src={wave} alt="Wave for login page" />
      
      <div className="container">
        <div className="img">
          <img src={signInSVG} alt="Login SVG (Photo)" />
        </div>

        <div className="login-container">
          <form onSubmit={onSubmit}>
            <img className="avatar" src={avatar} alt="Avatar Photo" />
            <h4>Welcome Back!</h4>
            <div className="input-div one">
              <div className="i">
                <i className="bi bi-person"></i>
              </div>
              <div>
                <h5 className="email-placeholder" style={inputAnimation1 ? inputAnimationStyle : null}>
                  Email
                </h5>
                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  onFocus={() => setInputAnimation1(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation1(false)
                  }
                />
              </div>
            </div>
            <div className="input-div two">
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
                <h5 style={inputAnimation2 ? inputAnimationStyle : null}>
                  Password
                </h5>
                <input
                  className="input"
                  type={showPassword === false ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={onChange}
                  onFocus={() => setInputAnimation2(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation2(false)
                  }
                />
              </div>
            </div>

            <div className="flex">
              <div>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"> Remember Me!</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password ?
              </Link>
            </div>

            <button type="button" className="sign-btn">
              Sign In
            </button>

            <div className="sign-footer-container">
              <p>
                Not a member? <Link to="/sign-up">Register</Link>
              </p>

              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
