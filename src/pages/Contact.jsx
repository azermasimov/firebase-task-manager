import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

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
    <div>
      <header>
        <p>Contact with Sales Person</p>
      </header>

      {salesperson !== null && (
        <main>
          <div>
            <p>{salesperson?.name}</p>

            <form>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                onChange={onChange}
              ></textarea>
            </form>
          </div>
          <a
            href={`mailto:${salesperson.email}?Subject=${searchParams.get(
              "productName"
            )}&body=${message}`}
          >
              <button type="buttton">Send Message</button>
          </a>
        </main>
      )}
    </div>
  );
}

export default Contact;
