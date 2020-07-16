import { useState } from "react";
import { withRouter } from "next/router";
import Layout from "../../../../components/Layout";
import { resetPassword } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { showForm, name, newPassword, error, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: "",
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
      }
    });
  };

  const passwordResetForm = (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            name="email"
            value={email}
            placeholder="Type new password"
            required
            type="email"
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Change password</button>
      </form>
    </div>
  );

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

  return (
    <Layout className="container">
      <h2>Reset Password</h2>

      <hr />
      {showError}
      {showMessage}
      {passwordResetForm}
    </Layout>
  );
};

export default withRouter(ResetPassword);
