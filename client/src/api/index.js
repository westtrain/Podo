// import React from "react";
import Auth from "./auth";
// import User from "./user";
import Party from "./party";
import OTT from "./ott";

function API() {
  return (
    <>
      <h3>Auth</h3>
      <Auth />

      {/* <User /> */}
      <h3>Party</h3>
      <Party />
      <h3>OTT</h3>
      <OTT />
    </>
  );
}

export default API;
