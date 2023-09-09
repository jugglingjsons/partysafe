// components/Layout.js

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* Include the Searchbar component here */}
      </header>
      <main>{children}</main>
      <footer>Your footer content here</footer>
    </div>
  );
};

export default Layout;
