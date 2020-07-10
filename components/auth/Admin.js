import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.replace("/signin");
    } else if (isAuth().role !== 1) {
      Router.replace("/");
    }
  }, []);

  return <>{children}</>;
};

export default Admin;
