"use client";

import React from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiShoppingBag,
} from "react-icons/hi";
import { CgShoppingCart } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AdminCheck } from "@components/AdminCheck";
const DashSidebar = () => {
  const { loading, data: adminData } = AdminCheck();
  const pathname = usePathname();
  async function logout() {
    await signOut();
    router.push("/");
  }
  const active =
    "flex items-center px-4 py-2 rounded-lg gap-2 text-[18px] bg-slate-100";
  const inActive = "flex items-center px-4 py-2 rounded-lg  gap-2 text-[18px] ";
  return (
    <div className="w-full md:w-56 h-full shadow-xl">
      <div className="flex flex-col px-4 py-4 gap-2">
        {adminData.isAdmin && (
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? active : inActive}
          >
            <HiChartPie className="text-2xl" />
            <span>Dashboard</span>
          </Link>
        )}
        {adminData.isAdmin && (
          <Link
            href="/dashboard/dashProducts"
            className={
              pathname === "/dashboard/dashProducts" ? active : inActive
            }
          >
            <HiShoppingBag className="text-2xl" />
            <span>Products</span>
          </Link>
        )}
        {adminData.isAdmin && (
          <Link
            href="/dashboard/dashCategories"
            className={
              pathname === "/dashboard/dashCategories" ? active : inActive
            }
          >
            <IoIosSettings className="text-2xl" />
            <span>Categories</span>
          </Link>
        )}

        <Link
          href="/dashboard/dashProfile"
          className={pathname === "/dashboard/dashProfile" ? active : inActive}
        >
          <HiUser className="text-2xl" />
          <span>Profile</span>
        </Link>
        {adminData.isAdmin && (
          <Link
            href="/dashboard/dashUsers"
            className={pathname === "/dashboard/dashUsers" ? active : inActive}
          >
            <HiOutlineUserGroup className="text-2xl" />
            <span>Users</span>
          </Link>
        )}
        <Link
          href="/dashboard/dashOrders"
          className={pathname === "/dashboard/dashUsers" ? active : inActive}
        >
          <CgShoppingCart className="text-2xl" />

          <span>Orders</span>
        </Link>

        <button className="cursor-pointer flex items-center text-[18px] mx-4 gap-2">
          <HiArrowSmRight onClick={logout} className="text-2xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashSidebar;
