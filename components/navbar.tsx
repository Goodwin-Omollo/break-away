import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-5 lg:px-20">
      <Link href="/">
        <Image
          src="/logo/b-black-nobg.png"
          alt="Company Logo"
          width={80}
          height={80}
          className="lg:w-[100px] lg:h-[100px]"
        />
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Navbar;
