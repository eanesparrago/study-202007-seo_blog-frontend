import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "alpha@example.com",
    password: "password123",
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
          console.log("role", isAuth());

          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push(`/user`);
          }
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

  return (
    <>
      {signupForm()}

      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger sm">Reset Password</a>
      </Link>
    </>
  );
};

export default SigninComponent;
