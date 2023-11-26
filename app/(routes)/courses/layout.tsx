"use client";
import Header from "@/app/components/ui/Header";
import Heading from "@/app/utils/Heading";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
