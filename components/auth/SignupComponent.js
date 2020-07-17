import { useState } from "react";
import { signup, preSignup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "alpha",
    email: "alpha@example.com",
    password: "alpha123",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
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
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="Type your name"
            type="text"
            className="form-control"
          />
        </div>

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
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return <>{signupForm()}</>;
};

export default SignupComponent;
