import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import { useRouter } from "next/router";

const UpdateSingleBlog = () => {
  const router = useRouter();

  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update Blog</h2>
            </div>

            <div className="col-md-12">
              <BlogUpdate router={router}></BlogUpdate>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UpdateSingleBlog;
