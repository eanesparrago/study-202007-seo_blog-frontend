import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import Layout from "../../components/Layout";
import { listBlogsWithCategotiesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME } from "../../config";

const Blogs = ({ blogs, categories, tags, size, router }) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>

      <meta name="description" content="Programming blogs and tutorials" />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />

      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/sandwich.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/sandwich.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* Get app id from FB */}
      <meta property="fb:app_id" content="" />
    </Head>
  );

  const showAllBlogs = () => {
    return blogs.map((blog) => (
      <article key={blog._id}>
        <Card blog={blog}></Card>

        <hr />
      </article>
    ));
  };

  const showAllCategories = () => {
    return categories.map((category) => (
      <Link key={category._id} href={`/category/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((tag) => (
      <Link key={tag._id} href={`/tag/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming blogs and tutorials
                </h1>
              </div>

              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">{showAllBlogs()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </>
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

export default withRouter(Blogs);
