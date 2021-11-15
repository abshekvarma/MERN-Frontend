import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "abhishek",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => {
    return (
      <div className="col col-md-4 offset-sm-4 text-center">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New Account was created successfully. Please
          <Link to="/signin"> Click Here </Link> to Log In
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="col col-md-4 offset-sm-4 text-center">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    );
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(err => {
        console.log("Error in signup" + err);
      });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Singup Page" description="A page for user to signup">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
