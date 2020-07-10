import Link from "next/link";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <h2>Admin Dashboard</h2>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
