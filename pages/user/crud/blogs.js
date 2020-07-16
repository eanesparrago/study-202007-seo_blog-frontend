import { isAuth } from "../../../actions/auth";
import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";

const Blog = () => {
  const username = isAuth() && isAuth().username;

  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update/Delete Blog</h2>
            </div>

            <div className="col-md-12">
              <BlogRead username={username}></BlogRead>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
