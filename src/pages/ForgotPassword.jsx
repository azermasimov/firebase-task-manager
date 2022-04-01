import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
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
    <div>
      <header>
        <p>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            id={email}
            value={email}
            onChange={onChange}
          />

          <Link to="/sign-in">Sign In</Link>

          <button>Send Reset Link</button>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
