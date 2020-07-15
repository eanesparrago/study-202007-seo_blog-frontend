import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";

import Layout from "../../components/Layout";
import { getSingleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME } from "../../config";
import Card from "../../components/blog/Card";

const Category = ({ category, blogs }) => {
  return (
    <>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                {blogs.map((blog) => (
                  <div>
                    <Card key={blog._id} blog={blog}></Card>
                    <hr/>
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return getSingleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;
