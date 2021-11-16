import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const goBack = () => (
    <div className="mt-5">
      <Link
        className="btn btn-sm btn-dark mb-3 float-left"
        to="/admin/dashboard"
      >
        Go Back
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend request fired
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success)
      return <h4 className="text-success">Category created Successfully</h4>;
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-dark text-left">Enter the category</p>
        <input
          type="text"
          className="form-control my-3 tex-left"
          autoFocus
          onChange={handleChange}
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info float-left">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
