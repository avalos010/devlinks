import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="flex flex-row ">
      <ul className="flex flex-row">
        <Link href={"/myLinks"}>MyLinks</Link>
        <Link href={"/details"}>Profile Details</Link>
        <Link href={"/signout"}>Signout</Link>
      </ul>
    </div>
  );
};

export default Nav;
