import React from "react";
import HomeContent from "../../homeContent/HomeContent";
import LeftNav from "../../leftNav/LeftNav";
import UpNav from "../../upNav/UpNav";

function Home() {
  return (
    <div className="home">
      <div className="row g-0">
        <div className="col-md-2 ">
          <LeftNav />
        </div>
        <div className="col-md-10">
          <UpNav />
          <HomeContent/>
        </div>
      </div>
    </div>
  );
}

export default Home;
