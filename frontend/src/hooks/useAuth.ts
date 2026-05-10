"use client";

import {
  useRouter
} from "next/navigation";

import {
  useEffect,
  useState
} from "react";

export default function useAuth(
  allowedRole: string
) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if(!token){

      router.push("/login");

      return;
    }

    if(role !== allowedRole){

      router.push("/login");

      return;
    }

    setLoading(false);

  }, [allowedRole, router]);

  return loading;
}