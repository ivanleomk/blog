import React from "react";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { classNames } from "../utils/tailwind";
import { MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";

type NavigationLink = {
  name: string;
  href: string;
};

type DropdownButtonProps = {
  links: NavigationLink[];
};

const DropdownButton = ({ links }: DropdownButtonProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700  focus:ring-indigo-500">
          <MenuIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {links.map((link) => {
              return (
                <div key={link.name}>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={link.href}>
                        <span
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700",
                            "block px-4 py-2 text-sm cursor-pointer hover:underline"
                          )}
                        >
                          {link.name}
                        </span>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownButton;
