import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <>
      <div>
        <header>
          <p>Welcome Back</p>
        </header>

        <form>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div>
            <input
              type={showPassword === false ? "password" : "text"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <p onClick={() => setShowPassword((prevState) => !prevState)}>Show Password</p>
        
          <Link to="/forgot-password">
            Forgot Password
          </Link>

          <div>
            <button>Sign In</button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to="/sign-up">
          Sign Up instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
