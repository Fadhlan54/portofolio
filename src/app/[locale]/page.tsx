"use client";

import React, { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const t = useTranslations("Footer");

  useEffect(() => {
    gsap.utils.toArray("section").forEach((section) => {
      const el = section as HTMLElement;
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",

        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(el, { opacity: 0, y: 50, duration: 0.3 });
        },
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />

      <footer className="bg-primary-600 border-t border-gray-200 dark:bg-gray-900 text-white py-4 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p>{t("copyright")}</p>
        </div>
      </footer>
    </main>
  );
}
