"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import SectionTitle from "./elements/sectionTitle";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  const t = useTranslations("About");

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
    )
      .fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        skillsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  const skills = {
    languagesFrameworks: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Golang",
      "PHP",
      "React.js",
      "Next.js",
      "React Native",
      "Express.js",
      "GoFiber",
      "Laravel",
    ],
    databaseTools: [
      "PostgreSQL",
      "Redis",
      "Sequelize",
      "Gorm",
      "Git",
      "Docker",
      "AWS (EC2, RDS, S3)",
      "Shadcn",
      "Redux",
      "Midtrans API",
      "RajaOngkir API",
    ],
    uiuxTesting: ["Figma", "Jest", "React Testing Library"],
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle>{t("title")}</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div ref={contentRef}>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
              {t("description1")}
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              {t("description2")}
            </p>
          </div>

          <div ref={skillsRef}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  {t(category)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs md:text-sm text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
