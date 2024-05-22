"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  {
    title: "Books",
    href: "#",
  },
];

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <header className=" py-4   md:py-6  bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              OpenLibrary
            </Link>
          </div>
          <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 ">
            {navLinks.map((link, index) => (
              <Link
                href={link.href}
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                key={index}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              Access the Dashboard
            </Link>
          </div>

          {/* Hambergur mobile menu  */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span
                style={{ display: !expanded ? "block" : "none" }}
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </span>

              <span
                style={{ display: expanded ? "block" : "none" }}
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <MobileNav expanded={expanded} navLinks={navLinks} />
      </div>
    </header>
  );
}

export default Navbar;
