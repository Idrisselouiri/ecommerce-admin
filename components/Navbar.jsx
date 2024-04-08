"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Navbar, TextInput, Dropdown } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const path = usePathname();

  return (
    <Navbar className="border-b-2">
      <Link
        href="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Idriss
        </span>
        Shop
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-2 md:order-2">
        <Link href={"/register"}>
          <Button gradientDuoTone="purpleToPink">Register</Button>
        </Link>
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaSun />
        </Button>
        <Link href={"/cartItems"} className="relative p-3 pl-0">
          <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" />
          <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
            1
          </div>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link href="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link href="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/products"} as={"div"}>
          <Link href="/projects">Products</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
