import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((category, index) => (
      <button
        onDoubleClick={() => promptDelete(category.slug)}
        title="Double click to delete"
        key={index}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {category.name}
      </button>
    ));
  };

  const promptDelete = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: true,
          reload: !reload,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: false,
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-success">Category is removed</p>;
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>

        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>

      <div className="">
        <button type="Submit" className="btn btn-primary">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      {newCategoryForm()}
      <div>{showCategories()}</div>
    </>
  );
};

export default Category;
