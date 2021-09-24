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
    <div className="flex items-center justify-center w-full px-3 py-3 mx-auto border-b border-gray-200 md:px-10">
      <Link href="/">
        <a>
          ZochilCare ❤️
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
