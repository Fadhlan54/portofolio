"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Download, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const navItems = [
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("projects") },
    { href: "#experience", label: t("experience") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav>
      <div className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16 ">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold text-primary-600 dark:text-primary-500"
              >
                Fadhlan
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2"
                >
                  {item.label}
                </a>
              ))}

              {/* Language Switcher */}
              <div className="flex items-center border-l border-gray-200 dark:border-gray-700 pl-4 ml-4">
                <button
                  onClick={() =>
                    changeLanguage(pathname.includes("/id") ? "en" : "id")
                  }
                  className="flex items-center gap-2 text-gray-700 cursor-pointer dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors p-2"
                  title={t("changeLanguage")}
                  id="change-language"
                >
                  <Languages size={20} />
                  <span className="text-sm font-medium">
                    {pathname.includes("/id") ? "ID" : "EN"}
                  </span>
                </button>
                <Tooltip
                  anchorSelect="#change-language"
                  content={t("translate")}
                  style={{
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                  variant={theme === "dark" ? "light" : "dark"}
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                title={t("toggleTheme")}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Download CV Button */}
              <a
                href="/pdf/CV_Muhammad_Fadhlan_Aziz.pdf"
                download
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download size={16} />
                {t("downloadCV")}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() =>
                  changeLanguage(pathname.includes("/id") ? "en" : "id")
                }
                className="p-2 flex gap-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <Languages size={20} />
                <span className="text-sm font-medium">
                  {pathname.includes("/id") ? "ID" : "EN"}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/pdf/CV_Muhammad_Fadhlan_Aziz.pdf"
                  download
                  className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={16} />
                  {t("downloadCV")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-16"></div>
    </nav>
  );
}
