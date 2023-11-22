"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const Protected = ({ children }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  useLayoutEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);
  return children;
};

export default Protected;
