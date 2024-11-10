"use client";
import { usePathname } from "next/navigation";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/icon.png";
import { Button } from "./ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full bg-muted px-8 py-4">
      <Image src={Logo} alt="Recruiter" className="mx-auto max-w-16" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "link"}
          >
            <Link href={link.href} className="w-fit">
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
