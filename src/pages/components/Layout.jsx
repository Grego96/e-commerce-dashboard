import React from "react";
import LeftNav from "./LeftNav";

function Layout(props) {
  return (
    <div className="row g-0 vh-100">
      <div className="col-12 col-md-4 col-xl-2 bg-black">
        <LeftNav />
      </div>
      <div className="col-12 col-md-8 col-xl-10 p-4">{props.children}</div>
    </div>
  );
}

export default Layout;
