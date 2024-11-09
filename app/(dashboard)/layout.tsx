import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="grid lg:grid-cols-6">
        <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
          <Sidebar />
        </div>
        <div className="lg:col-span-5">
          <Navbar />
          <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
        </div>
      </main>
    </>
  );
}
