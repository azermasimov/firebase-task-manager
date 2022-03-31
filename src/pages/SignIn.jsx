import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    <>
      <div>
        <header>
          <p>Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
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

          <p onClick={() => setShowPassword((prevState) => !prevState)}>
            Show Password
          </p>

          <Link to="/forgot-password">Forgot Password</Link>

          <div>
            <button>Sign In</button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to="/sign-up">Sign Up instead</Link>
      </div>
    </>
  );
}

export default SignIn;
