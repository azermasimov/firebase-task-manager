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
    <div className="row justify-content-center">
      <div className="col-md-5 text-center text-md-start">
        <header>
          <h4 className="text-center m-5">Forgot Password ?</h4>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control my-3"
                type="email"
                placeholder="Email"
                id={email}
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="d-grid gap-2 mb-4">
              <button type="button" className="btn btn-primary">
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/sign-in">Sign In</Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ForgotPassword;
