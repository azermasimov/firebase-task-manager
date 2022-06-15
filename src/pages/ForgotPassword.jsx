import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import forgotPasswordSVG from "../assets/svg/undraw_forgot_password_re_hxwm.svg";
import avatar from "../assets/svg/undraw_male_avatar_323b.svg";

function ForgotPassword() {
  const inputAnimationStyle = {
    top: "-5px",
    fontSize: "15px",
  };
  const [inputAnimation, setInputAnimation] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/sign-in");
    } catch (err) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="sign-page">
      <div className="container">
        <div className="img">
          <img src={forgotPasswordSVG} alt="Forgot-Password SVG (Photo)" />
        </div>
        <main className="login-container">
          <form onSubmit={onSubmit}>
            <img className="avatar" src={avatar} alt="Avatar Photo" />
            <h4>Forgot Password ?</h4>
            <div className="input-div one">
              <div className="i">
                <i className="bi bi-person"></i>
              </div>
              <div>
                <h5
                  className="email-placeholder"
                  style={inputAnimation ? inputAnimationStyle : null}
                >
                  Email
                </h5>
                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  onFocus={() => setInputAnimation(true)}
                  onBlur={(e) =>
                    e.target.value ? null : setInputAnimation(false)
                  }
                />
              </div>
            </div>

            <div>
              <button type="button" className="sign-btn">
                Send Reset Link
              </button>
            </div>

            <div className="sign-footer-container">
              <p>Remembered your password ?</p>
              <Link to="/sign-in">Sign In</Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ForgotPassword;
