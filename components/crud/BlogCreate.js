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
  return (
    <div>
      <h2>Blog Create</h2>
    </div>
  );
};

export default withRouter(BlogCreate);
