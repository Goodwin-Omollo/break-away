import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      {/* Logo & Description */}
      <div className="flex flex-col items-start space-y-4">
        <Image
          src="/logo/b-black-nobg.png"
          alt="Break Away Logo"
          width={150}
          height={150}
        />
      </div>

      {/* <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Break Away. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
