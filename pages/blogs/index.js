import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import { listBlogsWithCategotiesAndTags } from "../../actions/blog";
import { API } from "../../config";

const Blogs = () => {
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
            <div className="col-md-12">Show all blogs</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blogs;
