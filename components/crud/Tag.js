import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getTags, removeTag } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((tag, index) => (
      <button
        onDoubleClick={() => promptDelete(tag.slug)}
        title="Double click to delete"
        key={index}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {tag.name}
      </button>
    ));
  };

  const promptDelete = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this tag?");

    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
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
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-success">Tag is removed</p>;
    }
  };

  const newTagForm = () => (
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
          Create Tag
        </button>
      </div>
    </form>
  );

  return (
    <>
      {newTagForm()}
      <div className="mb-3">{showTags()}</div>

      {showSuccess()}
      {showError()}
      {showRemoved()}
    </>
  );
};

export default Tag;
