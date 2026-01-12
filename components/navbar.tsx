"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Calculator,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-between gap-2">
            <Image
              src={"/dc.svg"}
              alt="Dewan Hukum Siber Indonesia Logo"
              width={48}
              height={48}
            />
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Dewan Hukum Siber Indonesia
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#courses"
              className="text-foreground hover:text-primary transition"
            >
              Program
            </a>
            <a
              href="#features"
              className="text-foreground hover:text-primary transition"
            >
              Mandat
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition"
            >
              Mitra
            </a>
            <Link
              href="/kalkulator-waris"
              className="text-foreground hover:text-primary transition flex items-center gap-1"
            >
              <Calculator className="h-4 w-4" />
              Kalkulator Waris
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white shadow-lg border z-20 py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-slate-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {user.role === "admin" && (
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard Admin
                        </Link>
                      )}

                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        Profil Saya
                      </Link>

                      <Link
                        href="/kelas"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="h-4 w-4" />
                        Kelas Saya
                      </Link>

                      <div className="border-t mt-2 pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button>Daftar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 mt-4">
            <a
              href="#courses"
              className="block text-foreground hover:text-primary"
            >
              Program
            </a>
            <a
              href="#features"
              className="block text-foreground hover:text-primary"
            >
              Mandat
            </a>
            <a
              href="#testimonials"
              className="block text-foreground hover:text-primary"
            >
              Mitra
            </a>
            <Link
              href="/kalkulator-waris"
              className="flex items-center gap-2 text-foreground hover:text-primary"
            >
              <Calculator className="h-4 w-4" />
              Kalkulator Waris
            </Link>

            {isAuthenticated && user ? (
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>

                {user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-2 py-2 text-slate-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard Admin
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profil Saya
                </Link>

                <Link
                  href="/kelas"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  Kelas Saya
                </Link>

                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
