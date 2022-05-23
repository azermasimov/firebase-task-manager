import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";

function SignIn() {
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
    <div className="row justify-content-center">
      <div className="col-md-5 text-center text-md-start">
        <header>
          <h4 className="text-center m-5">Welcome Back!</h4>
        </header>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="form-group form-outline mb-4 input-group">
            <input
              className="form-control"
              type={showPassword === false ? "password" : "text"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <span
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="input-group-text"
              id="basic-addon1"
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </span>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <Link className="link-primary" to="/forgot-password">
                Forgot Password
              </Link>
            </div>
          </div>

          <div className="d-grid gap-2 mb-4">
            <button type="button" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <Link className="col-auto link-primary" to="/sign-up">
              Register
            </Link>
          </p>
        </div>

        <div className="text-center">
          <OAuth />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
