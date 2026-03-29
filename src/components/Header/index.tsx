import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SearchBar } from "@/src/components/Header/SearchBar";

import menuData from "./menuData";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const closeDropdown = useCallback(() => setOpenIndex(-1), []);

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    if (openIndex === -1) return;

    const handleClickOutside = (e: MouseEvent) => {
      const isInsideAnyDropdown = Array.from(dropdownRefs.current.values()).some((el) =>
        el.contains(e.target as Node),
      );
      if (!isInsideAnyDropdown) {
        closeDropdown();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex, closeDropdown]);

  useEffect(() => {
    closeDropdown();
    setNavbarOpen(false);
  }, [pathname, closeDropdown]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navbarOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-black/5 dark:border-white/5 bg-light-theme/80 dark:bg-slate-950/80 backdrop-blur-md transition-all">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/images/logo/mml-logotype-black.svg"
              alt="MML"
              width={100}
              height={40}
              className="dark:hidden opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/logo/mml-logotype-white.svg"
              alt="MML"
              width={100}
              height={40}
              className="hidden dark:block opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {menuData.map((menuItem, index) =>
              menuItem.submenu ? (
                <div
                  key={menuItem.id}
                  className="relative group"
                  ref={(el) => {
                    if (el) dropdownRefs.current.set(menuItem.id, el);
                    else dropdownRefs.current.delete(menuItem.id);
                  }}
                >
                  <button
                    onClick={() => handleSubmenu(index)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                      openIndex === index
                        ? "text-dark dark:text-white"
                        : "text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white"
                    }`}
                  >
                    {menuItem.title}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 14"
                      className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  {menuItem.submenu && openIndex === index && (
                    <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-black/10 dark:border-slate-800 shadow-xl overflow-hidden animate-fade-in">
                      <div className="p-1">
                        {menuItem.submenu.map((submenuItem) => (
                          <Link
                            key={submenuItem.id}
                            href={submenuItem.path}
                            onClick={() => setOpenIndex(-1)}
                            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-secondary dark:text-slate-300 hover:bg-lightgrey dark:hover:bg-slate-800 hover:text-dark dark:hover:text-white transition-colors"
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={menuItem.id}
                  href={menuItem.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                    menuItem.path === pathname
                      ? "text-dark dark:text-white bg-black/5 dark:bg-white/5"
                      : "text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white"
                  }`}
                >
                  {menuItem.title}
                </Link>
              ),
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <SearchBar />
            <a
              href="https://github.com/mml-io"
              target="_blank"
              rel="noreferrer"
              aria-label="MML on GitHub"
              className="hidden lg:flex text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
            <div className="hidden lg:block h-6 w-px bg-black/10 dark:bg-white/10" />
            {mounted && <ThemeToggler />}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              aria-label="Mobile Menu"
              className="lg:hidden p-2 text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[24px] bg-current transition-all duration-300 ${
                  navbarOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[24px] bg-current transition-all duration-300 ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[24px] bg-current transition-all duration-300 ${
                  navbarOpen ? "top-[-8px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bottom-0 h-[calc(100vh-4rem)] border-t border-black/5 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 space-y-1 shadow-xl animate-fade-in overflow-y-auto">
          <div className="px-1 mb-3">
            <SearchBar className="block w-full" />
          </div>
          {menuData.map((menuItem, index) =>
            menuItem.submenu ? (
              <div key={menuItem.id}>
                <button
                  onClick={() => handleSubmenu(index)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {menuItem.title}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 14"
                    className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                {menuItem.submenu && openIndex === index && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menuItem.submenu.map((submenuItem) => (
                      <Link
                        key={submenuItem.id}
                        href={submenuItem.path}
                        onClick={() => {
                          setNavbarOpen(false);
                          setOpenIndex(-1);
                        }}
                        className="block py-2.5 px-4 rounded-xl text-sm text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {submenuItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={menuItem.id}
                href={menuItem.path}
                onClick={() => setNavbarOpen(false)}
                className={`block w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  menuItem.path === pathname
                    ? "bg-black/5 dark:bg-white/10 text-dark dark:text-white"
                    : "text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {menuItem.title}
              </Link>
            ),
          )}

          <div className="pt-4 mt-4 border-t border-black/5 dark:border-slate-800 flex items-center gap-4 px-4">
            <a
              href="https://github.com/mml-io"
              target="_blank"
              rel="noreferrer"
              aria-label="MML on GitHub"
              className="text-secondary dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
