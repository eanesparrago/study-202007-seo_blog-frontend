import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = () => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message",
    });
  };

  const contactForm = (
    <form onSubmit={clickSubmit} className="pb-5">
      <div className="form-group">
        <label htmlFor="message" className="lead">
          Message
        </label>
        <textarea
          onChange={handleChange}
          value={message}
          name="message"
          id="message"
          cols="30"
          rows="10"
          required
          className="form-control"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="name" className="lead">
          Name
        </label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          className="form-control"
          value={name}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="lead">
          Email
        </label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          className="form-control"
          value={email}
          required
        />
      </div>

      <div>
        <button className="btn btn-primary">{buttonText}</button>
      </div>
    </form>
  );

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (
    <div
      className="alert alert-success"
      style={{ display: success ? "block" : "none" }}
    >
      Thank you for contacting us.
    </div>
  );

  return (
    <>
      <p>
        {showSuccess}
        {showError}
        {contactForm}
      </p>
    </>
  );
};

export default ContactForm;
