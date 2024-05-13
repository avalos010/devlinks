import Link from "next/link";
import React from "react";
import SignOut from "./Signout";

const Nav = async () => {
  return (
    <div className="flex flex-row ">
      <ul className="flex flex-row">
        <Link href={"/myLinks"}>MyLinks</Link>
        <Link href={"/profile"}>Profile</Link>
        <SignOut />
      </ul>
    </div>
  );
};

export default Nav;
