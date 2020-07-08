import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
