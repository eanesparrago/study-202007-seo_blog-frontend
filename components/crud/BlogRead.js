import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this blog?");

    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth()) {
      const role = isAuth().role;

      const href =
        (role === 0 && `/user/crud/${blog.slug}`) ||
        (role === 1 && `/admin/crud/${blog.slug}`);

      return (
        <Link href={href}>
          <a className="btn btn-sm btn-warning ml-2">Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog) => (
      <div key={blog._id} className="pb-5">
        <h3>{blog.title}</h3>

        <p className="mark">
          Written by {blog.postedBy.name} | Published on{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>

        <button
          onClick={() => deleteConfirm(blog.slug)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>

        {showUpdateButton(blog)}
      </div>
    ));
  };

  return (
    <>
      <div className="row">
        {message && <div className="alert alert-warning">{message}</div>}

        <div className="col-md-12">{showAllBlogs()}</div>
      </div>
    </>
  );
};

export default BlogRead;
