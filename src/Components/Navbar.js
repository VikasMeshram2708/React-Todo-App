import React from "react";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">{props.title}</a>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  title: "Todo App",
};

export default Navbar;
