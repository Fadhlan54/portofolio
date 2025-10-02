"use client";

import React, { useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import SectionTitle from "./elements/sectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export function Experience() {
  const sectionRef = useRef(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const t = useTranslations("Experience");

  const experiences: ExperienceItem[] = t.raw("list");

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className=" max-w-4xl mx-auto">
        <SectionTitle>{t("title")}</SectionTitle>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={`exp-${index}`}
              ref={addToRefs}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="md:text-lg text-primary-600 dark:text-primary-400">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span className="text-xs md:text-sm">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <span className="text-xs sm:text-sm">{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="text-gray-600 dark:text-gray-300 flex items-start text-sm md:text-base"
                  >
                    <span className="text-primary-500 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
