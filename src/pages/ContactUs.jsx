import React, { useRef } from "react";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

function ContactUs() {
  const position = [40.432387577289965, 49.84016162614363];

  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ly9mspt",
        "template_9g89egh",
        form.current,
        "Ao_Rdn4JavojOZoEP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

      form.current.reset();
      toast.success("Email sent successfully!");
  }

  return (
    <div className="contact-us-page-container">
      <div className="map-container">
        <Map
          provider={osm}
          height={500}
          defaultCenter={position}
          defaultZoom={11}
        >
          <Marker width={50} anchor={position} />
        </Map>
      </div>
      <div className="contact-container">
        <h5>Contact Us</h5>

        <div className="contact-info">
          <ul>
            <li>
              <i className="bi bi-geo-alt"></i> Zahid Gambarov st.
            </li>
            <li>
              <i className="bi bi-whatsapp"></i> +994 (55) 000 00 00
            </li>
            <li>
              <i className="bi bi-envelope"></i> mesimovazer@gmail.com
            </li>
          </ul>
        </div>

        <div className="form-container">
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor="fullName">Fullname:</label>
            <input name="name" type="text" id="fullName" />

            <label htmlFor="email">Email:</label>
            <input name="email" type="email" id="email" />

            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
            ></textarea>
            <button className="contact-us-btn" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
