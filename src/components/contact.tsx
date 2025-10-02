"use client";

import React, { useEffect, useRef } from "react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import SectionTitle from "./elements/sectionTitle";

export function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const t = useTranslations("Contact");

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle>{t("title")}</SectionTitle>

        <p
          ref={contentRef}
          className="md:text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          {t("description")}
        </p>

        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12"
        >
          <div className="space-y-4 md:space-y-6">
            <a
              href="mailto:muhammadfadhlan0011@gmail.com"
              className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Mail size={24} />
              <span>muhammadfadhlan0011@gmail.com</span>
            </a>

            <a
              href="https://github.com/Fadhlan54"
              className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github size={24} />
              <span>github.com/Fadhlan54</span>
            </a>
          </div>

          <div className="space-y-4 md:space-y-6">
            <a
              href="https://linkedin.com/in/muhammad-fadhlan-aziz"
              className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Linkedin size={24} />
              <span>linkedin.com/in/muhammad-fadhlan-aziz</span>
            </a>

            <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin size={24} />
              <span>{t("location")}</span>
            </div>
          </div>
        </div>

        <div ref={contentRef}>
          <a
            href="mailto:muhammadfadhlan0011@gmail.com"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors md:text-lg"
          >
            <Mail className="w-5 h-5 md:h-6 md:w-6" />
            {t("sendMessage")}
          </a>
        </div>
      </div>
    </section>
  );
}
