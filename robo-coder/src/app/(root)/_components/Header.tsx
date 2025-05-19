"use client";

import { useUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Menu, Sparkles, X } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { user } = useUser();
  const [convexUser, setConvexUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    async function fetchUser() {
      if (user?.id) {
        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
        const userData = await convex.query(api.users.getUser, {
          userId: user.id,
        });
        setConvexUser(userData);
      }
    }
    
    fetchUser();
  }, [user?.id]);

  return (
    <div className="relative z-50">
      <div
        className="flex items-center lg:justify-between justify-between 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo hover effect */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
            />

            {/* Logo */}
            <div
              className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all"
            >
              <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                CodeCraft
              </span>
              <span className="hidden sm:block text-xs text-blue-400/60 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-white
                 transition-colors"
              >
                Snippets
              </span>
            </Link>
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 
          hover:border-blue-500/50 transition-all"
        >
          {isMobileMenuOpen ? (
            <X className="size-6 text-gray-400" />
          ) : (
            <Menu className="size-6 text-gray-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute inset-x-0 top-full pt-2 px-4"
          >
            <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 shadow-xl">
              <div className="space-y-4">
                <Link
                  href="/snippets"
                  className="flex items-center gap-2 p-3 rounded-lg text-gray-300 hover:bg-blue-500/10 
                  transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Code2 className="size-5" />
                  <span>Snippets</span>
                </Link>

                <div className="space-y-3 border-t border-gray-800/50 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Theme</span>
                    <ThemeSelector />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Language</span>
                    <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
                  </div>
                </div>

                {!convexUser?.isPro && (
                  <Link
                    href="/pricing"
                    className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r 
                    from-amber-500/10 to-orange-500/10 border border-amber-500/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="size-5 text-amber-400" />
                    <span className="text-amber-400">Upgrade to Pro</span>
                  </Link>
                )}

                <SignedIn>
                  <div className="pt-2 border-t border-gray-800/50">
                    <RunButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Header;