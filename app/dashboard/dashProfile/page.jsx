"use client";

import React, { useEffect } from "react";
import Layouts from "@components/Layouts";
import { useState } from "react";
import toast from "react-hot-toast";
import { AdminCheck } from "@components/AdminCheck";
import UserForm from "@components/form/UserForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const session = useSession();
  const { status } = session;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const getUser = async () => {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        }
      };
      getUser();
    }
  }, [session, status]);

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
          body: JSON.stringify(dataInfo),
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
      const res = await fetch("/api/profile", {
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

  if (status === "loading" || !profileFetched) {
    return (
      <p className="w-full text-2xl font-semibold text-center">Loading...</p>
    );
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <Layouts>
      <UserForm
        userData={user}
        onSubmit={handleSubmit}
        onDeleteUser={handleDeleteUser}
        loading={loading}
      />
    </Layouts>
  );
};

export default page;
