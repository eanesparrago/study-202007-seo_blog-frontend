import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const BlogCreate = ({ router }) => {
  const [body, setBody] = useState({});
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

  const publishBlog = (e) => {
    e.preventDefault();
    console.log("Ready to publish blog");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleBody = () => {};

  const createBlogForm = () => (
    <form onSubmit={publishBlog}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          name="title"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <ReactQuill
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

  return <div>{createBlogForm()}</div>;
};

export default withRouter(BlogCreate);
