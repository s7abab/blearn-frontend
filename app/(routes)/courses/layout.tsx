"use client";
import Header from "@/app/components/common/ui/Header";

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
