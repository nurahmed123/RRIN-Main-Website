'use client';

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Menu, Sparkles, X } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { useState } from "react";

function HeaderContent() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const convexUser = useQuery(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-50">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl p-4 lg:p-6 mb-4 rounded-lg">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-400" />
          ) : (
            <Menu className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {/* Logo - visible on all screens */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
            group-hover:opacity-100 transition-all duration-500 blur-xl" />
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
            ring-white/10 group-hover:ring-white/20 transition-all">
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
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 
                bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="hidden sm:block text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-2 sm:pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#0a0a0f]/95 backdrop-blur-xl">
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-center gap-4 p-4 bg-[#1e1e2e]/50 rounded-xl">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>
            
            <Link
              href="/snippets"
              className="flex items-center gap-3 w-full p-4 bg-[#1e1e2e]/50 rounded-xl text-gray-300 
                hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Code2 className="w-5 h-5" />
              <span className="font-medium">Snippets</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderContent;