import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthState, useAuthDispatch } from "../context/auth";
import * as storage from "../lib/storage";

function Navbar() {
  const { authenticated, loading, user } = useAuthState();
  const dispatch = useAuthDispatch();
  const logout = async () => {
    await storage.removeItem("access_token");
    dispatch("LOGOUT");
  };

  return (
    <div className="flex items-center justify-center w-full px-3 py-3 mx-auto border-2 border-b md:px-10">
      <Link href="/">
        
        <a>
          <img src="/images/logo.png" className="object-contain h-10 mr-2 w-30"/>
          
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
