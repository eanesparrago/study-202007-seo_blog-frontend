import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPassword } from "../../../actions/auth";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      message: "",
      error: "",
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, message: "", error: "" });

    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false,
        });
      }
    });
  };

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  const showMessage = (
    <div
      className="alert alert-info"
      style={{ display: message ? "block" : "none" }}
    >
      Thank you for contacting us.
    </div>
  );

  const passwordForgotForm = (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Type your email"
            required
            type="email"
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Reset password</button>
      </form>
    </div>
  );

  return (
    <Layout className="container">
      <h2>Forgot Password</h2>

      <hr />
      {showError}
      {showMessage}
      {showForm && passwordForgotForm}
    </Layout>
  );
};

export default ForgotPassword;
