import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const BlogCreate = ({ router }) => {
  const blogFromLs = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(blogFromLs());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();

    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody("");
        setCheckedCategories([]);
        setCheckedTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);

    setValues({
      ...values,
      [name]: value,
      formData,
      error: "",
    });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);

    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleCategoryToggle = (tagId) => () => {
    setValues({ ...values, error: "" });
    const clickedCategory = checkedCategories.indexOf(tagId);
    const all = [...checkedCategories];

    if (clickedCategory === -1) {
      all.push(tagId);
    } else {
      all.splice(clickedCategory, 1);
    }

    console.log(all);

    setCheckedCategories(all);
    formData.set("categories", all);
  };

  const handleTagToggle = (tagId) => () => {
    setValues({ ...values, error: "" });
    const clickedTag = checkedTags.indexOf(tagId);
    const all = [...checkedTags];

    if (clickedTag === -1) {
      all.push(tagId);
    } else {
      all.splice(clickedTag, 1);
    }

    console.log(all);

    setCheckedTags(all);
    formData.set("tags", all);
  };

  const showCategories = () =>
    categories &&
    categories.map((category) => (
      <li className="list-unstyled" key={category._id}>
        <input
          onChange={handleCategoryToggle(category._id)}
          type="checkbox"
          className="mr-2"
          id={category.slug}
        />
        <label className="form-check-label" htmlFor={category.slug}>
          {category.name}
        </label>
      </li>
    ));

  const showTags = () =>
    tags &&
    tags.map((tag) => (
      <li className="list-unstyled" key={tag._id}>
        <input
          onChange={handleTagToggle(tag._id)}
          id={tag.slug}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label" htmlFor={tag.slug}>
          {tag.name}
        </label>
      </li>
    ));

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "block" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => (
    <form onSubmit={publishBlog}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          name="title"
          onChange={handleChange("title")}
        />
      </div>

      <div className="form-group">
        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={body}
          placeholder="Write something amazing..."
          onChange={handleBody}
        ></ReactQuill>
      </div>

      <div>
        <button className="btn btn-primary" type="submit">
          Publish
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}

          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>

              <hr />

              <div>
                <small className="text-muted">Max size: 1mb</small>
              </div>

              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  type="file"
                  accept="image*"
                  onChange={handleChange("photo")}
                  hidden
                />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>

            <hr />

            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>

          <div>
            <h5>Tags</h5>

            <hr />

            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogCreate);
