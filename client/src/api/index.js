// import React from "react";
import Auth from "./auth";
import User from "./user";
import Party from "./party";
import Statement from "./statement";
import OTT from "./ott";

function API() {
  return (
    <>
      <h3>Auth</h3>
      <Auth />
      <h3>User</h3>
      <User />
      <h3>Party</h3>
      <Party />
      <h3>Statement</h3>
      <Statement />
      <h3>OTT</h3>
      <OTT />
    </>
  );
}

export default API;
