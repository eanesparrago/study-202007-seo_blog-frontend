import Head from "next/head";
import { useState } from "react";

import Layout from "../../components/Layout";
import { listBlogsWithCategotiesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";

const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog) => (
      <article key={blog._id}>
        <Card blog={blog}></Card>

        <hr />
      </article>
    ));
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming blogs and tutorials
              </h1>
            </div>
          </header>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategotiesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default Blogs;
