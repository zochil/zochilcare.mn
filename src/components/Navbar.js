import React, { useEffect } from "react";
import Link from "next/link";

function Navbar({ logo }) {
  return (
    <div className="flex items-center justify-center w-full px-3 py-3 mx-auto border-2 border-b md:px-10">
      <Link href="/">
        <a>
          <img src={logo} className="object-contain h-10 mr-2 w-30"/>
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
