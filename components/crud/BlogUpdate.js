import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog } from "../../actions/blog";
import { QuillModules, QuillFormats } from "../../helpers/quill";

import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("blog", data);
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];

    blogCategories.map((c, i) => {
      ca.push(c._id);
    });

    setCheckedCategories(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];

    blogTags.map((t, i) => {
      ta.push(t._id);
    });

    setCheckedTags(ta);
  };

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

  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

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
  };

  const editBlog = () => {
    console.log("update blog");
  };

  const updateBlogForm = () => (
    <form onSubmit={editBlog}>
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
          Update
        </button>
      </div>
    </form>
  );

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

  const findOutCategory = (c) => {
    return checkedCategories.indexOf(c) !== -1 ? true : false;
  };

  const findOutTag = (t) => {
    return checkedTags.indexOf(t) !== -1 ? true : false;
  };

  const showCategories = () =>
    categories &&
    categories.map((category) => (
      <li className="list-unstyled" key={category._id}>
        <input
          onChange={handleCategoryToggle(category._id)}
          type="checkbox"
          checked={findOutCategory(category._id)}
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
          checked={findOutTag(tag._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label" htmlFor={tag.slug}>
          {tag.name}
        </label>
      </li>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}

          <div className="pt-3">
            <p>show success and error msg</p>
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

export default BlogUpdate;
