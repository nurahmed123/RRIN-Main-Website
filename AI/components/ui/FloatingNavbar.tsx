"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { IconType } from "react-icons";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon: IconType;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex fixed z-[5000] top-6 left-6 px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-6rem)] xl:w-[calc(100%-8rem)]",
          "sm:top-8 md:top-10 sm:px-6 md:px-10 sm:py-4 md:py-5",
          "bg-white/80 dark:bg-black/80 backdrop-blur-md",
          className
        )}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity">
              Arionys AI
            </Link>
          </div>

          {/* Center Section: Navigation (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-6 mx-4">
            {navItems.filter(item => item.name !== "Profile").map((navItem, idx) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "text-gray-600 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium hidden md:block",
                  className
                )}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">
                    <navItem.icon />
                  </span>
                  <span>{navItem.name}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section: Auth Buttons and Theme Toggle */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            )}

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <SignOutButton>
                  <button className="text-gray-600 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
                    Sign Out
                  </button>
                </SignOutButton>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "w-7 h-7 md:w-8 md:h-8" } }}
                />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-gray-600 dark:text-white p-1.5 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="space-y-1" role="presentation">
                <div className="w-4 h-0.5 bg-current" />
                <div className="w-4 h-0.5 bg-current" />
                <div className="w-4 h-0.5 bg-current" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Side Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Side Drawer */}
              <motion.div
                id="mobile-menu"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl z-[6000] sm:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                  <h2 className="text-gray-900 dark:text-white font-medium">Menu</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col p-4 space-y-4 bg-white dark:bg-gray-900">
                  {navItems.filter(item => item.name !== "Profile").map((navItem, idx) => (
                    <Link
                      key={`mobile-link=${idx}`}
                      href={navItem.link}
                      className="text-gray-600 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-lg">
                          <navItem.icon />
                        </span>
                        <span>{navItem.name}</span>
                      </span>
                    </Link>
                  ))}
                  {isSignedIn ? (
                    <SignOutButton>
                      <button
                        className="text-left w-full text-gray-600 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Out
                      </button>
                    </SignOutButton>
                  ) : (
                    <SignInButton mode="modal">
                      <button
                        className="text-left w-full text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-medium transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  )}
                </div>
              </motion.div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-[5500]"
                onClick={() => setMobileMenuOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
