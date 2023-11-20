"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const Protected = ({ children }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  return user ? children : redirect("/");
};

export default Protected;
