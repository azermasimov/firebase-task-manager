import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import contactPageSVG from "../assets/svg/contactPageSVG.svg";

function Contact() {
  const [message, setMessage] = useState("");
  const [salesperson, setSalesperson] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    (async function getSalesperson() {
      const docRef = doc(db, "users", params.salespersonId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSalesperson(docSnap.data());
      } else {
        toast.error("Couldn't get salesperson data");
      }
    })();
  }, [params.salesperson]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="contact-page-container">
      <div className="img-container">
        <img src={contactPageSVG} alt="Contact Page SVG" />
      </div>

      {salesperson !== null && (
        <div className="contact-container">
          <h4>Contact with Sales Person</h4>

          <input type="text" value={salesperson?.name} disabled />

          <form>
            <label htmlFor="message">Message: </label>
            <textarea
              name="message"
              id="message"
              // rows={8}
              // cols={60}
              onChange={onChange}
            ></textarea>
          </form>

          <a
            href={`mailto:${salesperson.email}?Subject=${searchParams.get(
              "productName"
            )}&body=${message}`}
          >
            <button className="contact-page-btn" type="buttton">
              Send Message
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Contact;
