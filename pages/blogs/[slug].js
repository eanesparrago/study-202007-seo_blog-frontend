import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";

import Layout from "../../components/Layout";
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";

const SingleBlog = ({ blog }) => {
  const showBlogCategories = () => {
    return blog.categories.map((category) => (
      <Link key={category._id} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((tag) => (
      <Link key={tag._id} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <p className="lead mt-3 mark">
                  Written by {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {showBlogCategories()}
                  {showBlogTags()}
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <p>TODO: Show related blogs</p>
            </div>

            <div className="container pb-5">
              <p>TODO: Show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
