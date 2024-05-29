"use client";

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Layouts from "@components/Layouts";
import toast from "react-hot-toast";
import UserForm from "@components/form/UserForm";
import { AdminCheck } from "@components/AdminCheck";

const page = () => {
  const { loading: adminLoading, data: adminData } = AdminCheck();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const res = await fetch("/api/profile?_id=" + id);
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        }
      };
      getUser();
    }
  }, []);

  const handleSubmit = async (ev, dataInfo) => {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...dataInfo, _id: id }),
        });
        const data = await res.json();
        if (data.success === false) {
          reject();
          setLoading(false);
        }
        if (res.ok) {
          resolve();
          setLoading(false);
        }
      } catch (error) {
        reject();
        setLoading(false);
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch("/api/profile?_id=" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
      }
      if (res.ok) {
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (adminLoading) {
    return (
      <p className="w-full text-2xl font-semibold text-center">Cheking...</p>
    );
  }
  if (adminData.isAdmin) {
    return (
      <Layouts>
        <UserForm
          userData={userData}
          onSubmit={handleSubmit}
          onDeleteUser={handleDeleteUser}
          loading={loading}
        />
      </Layouts>
    );
  } else if (!adminData.isAdmin) {
    return redirect("/");
  }
};

export default page;
