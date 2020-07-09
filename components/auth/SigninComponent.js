import { useState } from "react";
import { signin, authenticate } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "alpha@example.com",
    password: "alpha123",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // Save user token to cookie
        // Save user info to localstorage
        // Authenticate user
        authenticate(data, () => {
          Router.push(`/`);
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Type your email"
            type="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Type your password"
            type="password"
            className="form-control"
          />
        </div>

        <div>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    );
  };

  return <>{signupForm()}</>;
};

export default SigninComponent;
