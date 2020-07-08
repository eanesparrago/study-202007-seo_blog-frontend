import Link from "next/link";
import Layout from "../components/Layout";

const Signin = () => {
  return (
    <Layout>
      Signin page
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
};

export default Signin;
