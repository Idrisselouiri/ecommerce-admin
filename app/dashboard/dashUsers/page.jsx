"use client";

import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline, IoIosCheckmarkCircle } from "react-icons/io";
import Layouts from "@components/Layouts";
import { redirect } from "next/navigation";
import { AdminCheck } from "@components/AdminCheck";
import toast from "react-hot-toast";
import Link from "next/link";

const pageSize = 10; // Number of users per page

const DashUsers = () => {
  const { loading: adminLoading, data: adminData } = AdminCheck();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
        }
        if (res.ok) {
          setLoading(false);
          setUsers(data);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    setShowModal(false);
    try {
      toast("Loading...");
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
      }
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success("Deleted User Successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / pageSize);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(currentPage * pageSize, users.length);

  const usersToDisplay = users.slice(startIndex, endIndex);

  const changePage = (page) => {
    setCurrentPage(page);
    setLoading(false);
  };
  if (adminLoading) {
    return (
      <p className="w-full text-2xl font-semibold text-center">Cheking...</p>
    );
  }
  if (adminData.isAdmin) {
    return (
      <Layouts>
        <div className="flex flex-col w-full">
          <header>
            <div className="my-10 text-center w-full">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                All Users
              </h1>
            </div>
            <hr className="my-8 h-px border-0 bg-gray-300" />
          </header>
          <div className="overflow-x-auto mx-auto px-4 w-full">
            {loading && <p className="w-full text-center">Loading Users...</p>}
            {!loading && users.length === 0 && (
              <p className="w-full text-center text-xl font-semibold">
                No users available.
              </p>
            )}
            <>
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md  border rounded">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      #
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      User Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      User Email
                    </th>
                  </tr>
                </thead>
                {usersToDisplay.map((user, index) => (
                  <tbody className="divide-y divide-gray-200" key={user._id}>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                        <div class="h-10 w-10">
                          <img
                            class="h-full w-full rounded-full object-cover object-center bg-gray-200"
                            src={user.image}
                            alt={user.name}
                          />
                        </div>
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 truncate max-w-md">
                        {user.email}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <Link href={`/dashboard/dashUsers/${user._id}`}>
                          <button className="inline-block rounded bg-emerald-500 px-4 py-2 text-xs font-medium mr-2 text-white hover:bg-green-700">
                            Edit
                          </button>
                        </Link>
                        <div
                          onKeyDown={() => setShowModal(false)}
                          className="inline-block rounded bg-red-600 text-xs font-medium text-white hover:bg-red-700"
                        >
                          <button onClick={toggleModal} className="px-4 py-2">
                            Delete
                          </button>
                          {showModal && (
                            <>
                              <div className="fixed inset-0 z-10 bg-gray-300/50"></div>
                              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                                <div className="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
                                  <div className="relative p-5">
                                    <div className="text-center">
                                      <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                          Delete blog post
                                        </h3>
                                        <div className="mt-2 text-sm text-gray-500 max-w-sm">
                                          Are you sure you want to delete this{" "}
                                          {user.name.split(" ")[0]} user?
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-5 flex justify-end gap-3">
                                      <button
                                        onClick={closeModal}
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
                                        onClick={() => deleteUser(user._id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => changePage(i + 1)}
                      className={`mx-2 px-3 py-2 rounded ${
                        i + 1 === currentPage
                          ? "bg-blue-300 text-slate-900"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      </Layouts>
    );
  } else if (!adminData.isAdmin) {
    return redirect("/");
  }
};

export default DashUsers;
