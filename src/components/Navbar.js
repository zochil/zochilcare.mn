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

  console.log(user, " usershu");
  return (
    <div className="px-10 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between h-10">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img className="object-contain w-8 h-8" src="/images/logo.png" />
              <span className="pl-3 font-semibold">Dusal</span>
            </a>
          </Link>
        </div>
        <div className="flex">
          <nav>
            <ul className="flex gap-8 text-sm font-semibold text-gray-800">
              <li className="hover:text-blue-600">
                <Link href="/">
                  <a>Нүүр</a>
                </Link>
              </li>
              <li className="hover:text-blue-600">
                <Link href="/campaigns">
                  <a>Төслүүд</a>
                </Link>
              </li>
              <li className="hover:text-blue-600">
                <Link href="/posts">
                  <a>Мэдээ</a>
                </Link>
              </li>
              <li className="hover:text-blue-600">
                <Link href="/contact">
                  <a>Холбоо барих</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {!loading &&
            (!!authenticated ? (
              <>
                <Link href="/my-profile">
                  <a className="font-bold">{user.first_name}</a>
                </Link>
                <button
                  className="px-4 py-1 leading-5 hollow blue button"
                  onClick={logout}
                >
                  Гарах
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="px-4 py-1 leading-5 hollow blue button">
                    Нэвтрэх
                  </a>
                </Link>
                <Link href="/register">
                  <a className="px-4 py-1 leading-5 blue button">Бүртгүүлэх</a>
                </Link>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
