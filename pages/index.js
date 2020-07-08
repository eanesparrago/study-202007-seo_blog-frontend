import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      Index page
      <Link href="/signin">
        <a>Sign page</a>
      </Link>
    </Layout>
  );
};

export default Index;
