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

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

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
          "flex fixed z-[5000] top-6 left-6 px-4 py-3 rounded-lg border border-white/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "w-[370px] sm:w-[700px] md:w-[768px] lg:w-[1024px] xl:w-[1750px]",  // Increased mobile width by 50px
          "sm:top-8 md:top-10 sm:px-6 md:px-10 sm:py-4 md:py-5",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(10, 10, 20, 0.9)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-white font-semibold text-lg hover:opacity-90 transition-opacity">
              Arionys AI
            </Link>
          </div>

          {/* Center Section: Navigation (Desktop) */}
          <div className="hidden sm:flex items-center space-x-6 mx-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className="relative text-neutral-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                <span className="flex items-center space-x-1">
                  {navItem.icon && <span className="text-lg">{navItem.icon}</span>}
                  <span>{navItem.name}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section: Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center space-x-3">
                <SignOutButton>
                  <button className="text-neutral-200 hover:text-white transition-colors duration-200 text-sm font-medium">
                    Sign Out
                  </button>
                </SignOutButton>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "w-8 h-8" } }}
                />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 bg-white" />
                <div className="w-5 h-0.5 bg-white" />
                <div className="w-5 h-0.5 bg-white" />
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
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-[rgba(10,10,20,0.95)] backdrop-blur-lg border-r border-white/10 shadow-xl z-[6000] sm:hidden"
              >
                <div className="flex flex-col p-4 space-y-4">
                  {navItems.map((navItem, idx) => (
                    <Link
                      key={`mobile-link=${idx}`}
                      href={navItem.link}
                      className="text-neutral-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center space-x-2">
                        {navItem.icon && <span className="text-lg">{navItem.icon}</span>}
                        <span>{navItem.name}</span>
                      </span>
                    </Link>
                  ))}
                  {isSignedIn ? (
                    <SignOutButton>
                      <button
                        className="text-left w-full text-neutral-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-colors duration-200"
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
