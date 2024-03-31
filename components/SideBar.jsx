"use client";

import React from "react";
import { HiArrowSmRight, HiChartPie, HiShoppingBag } from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const path = usePathname();
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link href={"/dashboard"}>
            <Sidebar.Item
              active={path === "/dashboard"}
              as="div"
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link href={"/products"}>
            <Sidebar.Item
              active={path === "/products"}
              as="div"
              icon={HiShoppingBag}
            >
              Products
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight}>Sign In</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
