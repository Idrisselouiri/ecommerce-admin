"use client";

import { AdminCheck } from "@components/AdminCheck";
import Form from "@components/dash/Form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { loading: adminLoading, data: adminData } = AdminCheck();

  if (adminData.isAdmin) {
    return (
      <>
        <section className="p-4">
          <div className="sm:flex sm:items-center sm:justify-center">
            <div className="text-center sm:text-left">
              <p className="mt-1.5 text-lg text-red-500">
                Fill all the fields to add a new product!
              </p>
            </div>
          </div>

          <hr class="my-8 h-px border-0 bg-gray-300" />
          <div className="my-10 max-sm:my-12">
            <Form />
          </div>
        </section>
      </>
    );
  } else if (!adminLoading && !adminData.isAdmin) {
    return redirect("/");
  }
};

export default page;
