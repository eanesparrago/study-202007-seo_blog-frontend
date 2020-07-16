import { useEffect } from "react";
import Router, { withRouter } from "next/router";

import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { isAuth } from "../actions/auth";

const Signin = ({ router }) => {
  useEffect(() => {
    if (isAuth()) {
      Router.replace("/");
    }
  }, []);

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    }
  };

  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Sign In</h2>

      <div className="row">
        <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent></SigninComponent>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
