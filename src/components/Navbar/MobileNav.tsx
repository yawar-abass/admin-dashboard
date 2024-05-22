import Link from "next/link";
import React from "react";

const MobileNav = ({
  expanded,
  navLinks,
}: {
  expanded: boolean;
  navLinks: Array<{ title: string; href: string }>;
}) => {
  return (
    <nav
      style={{
        display: expanded ? "block" : "none",
      }}
      className={`px-1 py-8 ${
        expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
      } transition-all duration-300 ease-in-out `}
    >
      <div className="grid gap-y-7">
        {navLinks.map((link, index) => (
          <Link
            href={link.href}
            className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            key={index}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
