"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTop, setMenuTop] = useState("0px");
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (navbarRef.current) {
      setMenuTop(`${navbarRef.current.offsetHeight}px`);
    }
  }, [navbarRef.current?.offsetHeight]);

  return (
    <div className="relative">
      <div
        ref={navbarRef}
        className="navbar bg-base-200 shadow-sm flex justify-between z-[60] relative"
      >
        {/* Lado esquerdo da NavBar */}

        <div className="flex items-center gap-6">
          {/* LOGO */}
          <div>
            <Image
              src="/camera.avif"
              alt="Logo da Loja"
              width={58}
              height={58}
              className="ml-4 rounded-full"
            />
          </div>
          {/* Navigation links */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <button className="text-3xl text-base-content cursor-pointer hover:text-gray-600">
              <Link href={"/"}>Home</Link>
            </button>
          </div>
        </div>

        {/* Lado direito da NavBar */}
        <div className="flex items-center">
          <div className="ml-auto flex items-center">
            {/* Login / Register */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
              <Link
                href="/login"
                className="text-md text-base-content hover:text-gray-600"
              >
                Login
              </Link>
              <span aria-hidden="true" className="h-6 w-px bg-base-content" />
              <Link
                href="/registrar"
                className="text-md text-base-content hover:text-gray-700"
              >
                Criar conta
              </Link>
            </div>

            {/* Theme Switcher */}
            <div className="hidden md:flex">
              <ThemeSwitcher />
            </div>

            {/* Cart */}
            <div className="ml-4 lg:ml-6 hidden md:flex">
              <Link
                href="/carrinho"
                className="group -m-2 flex items-center p-2 text-base-content hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="text-lg m-2">Carrinho</span>
              </Link>
            </div>

            {/* Hamburger button */}
            <button
              className="btn btn-circle swap swap-rotate md:hidden"
              onClick={toggleMenu}
            >
              {/* Hamburger icon */}
              <svg
                className={`${
                  isMenuOpen ? "swap-on" : "swap-off"
                } fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* Close icon */}
              <svg
                className={`${
                  isMenuOpen ? "swap-off" : "swap-on"
                } fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas do mobile menu */}
      <div
        id="mobile-full-menu"
        className={`fixed inset-x-0 w-full bg-base-300 transform transition-transform 
          duration-300 ease-out z-50 overflow-y-auto md:hidden 
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{ top: menuTop, height: `calc(100vh - ${menuTop})` }}
      >
        <div className="p-4 flex flex-col h-full">
          <Link
            href={"/"}
            className="text-3xl cursor-pointer hover:text-gray-600 text-center pb-4"
          >
            Home
          </Link>
          {/* Login / Register */}
          <Link
            href="/login"
            className="text-3xl cursor-pointer hover:text-gray-600 text-center pb-4"
          >
            Login
          </Link>
          <Link
            href="/registrar"
            className="text-3xl cursor-pointer hover:text-gray-600 text-center pb-4"
          >
            Criar conta
          </Link>
          {/* Carrinho */}
          <div className="text-3xl cursor-pointer hover:text-gray-600 text-center pb-4">
            <Link href="/carrinho">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Carrinho
            </Link>
          </div>
          <div className="cursor-pointer hover:text-gray-600 text-center pb-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
