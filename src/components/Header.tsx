import Image from "next/image";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { classNames } from "../utils/tailwind";
import { ChevronDownIcon } from "@heroicons/react/solid";
import DropdownButton from "@/components/DropdownMenu";

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Office Equipment", href: "/tags/office-equipment" },
  { name: "All Articles", href: "/articles" },
  //   { name: "Pricing", href: "#" },
  //   { name: "Docs", href: "#" },
  //   { name: "Company", href: "#" },
];

const Header = () => {
  return (
    <header className="">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full flex items-center justify-between lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <Image
                src="/logo.png"
                height={100}
                width={200}
                alt={`${process.env.WEBSITE_NAME} Logo`}
              />
            </a>
          </div>
          <div className="hidden ml-10 space-x-8 lg:block">
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-600 hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="block lg:hidden">
            <DropdownButton links={navigation} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
