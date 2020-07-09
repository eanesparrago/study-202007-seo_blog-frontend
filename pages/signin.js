import { useEffect } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { isAuth } from "../actions/auth";

const Signin = () => {
  useEffect(() => {
    if (isAuth()) {
      Router.replace("/");
    }
  }, []);

  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Sign In</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent></SigninComponent>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
