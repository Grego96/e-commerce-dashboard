import React from "react";
import LeftNav from "./LeftNav";

function Layout(props) {
  return (
    <div className="home">
      <div className="row g-0 vh-100">
        <div className="col-md-4 col-lg-3 col-xl-2">
          <LeftNav />
        </div>
        <div className="col-md-8 col-lg-9 col-xl-10 p-4">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
