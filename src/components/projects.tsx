"use client";

import React, { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// Import custom styles
import "@/styles/swiper.css";

import Image from "next/image";
import SectionTitle from "./elements/sectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface ProjectList {
  title: string;
  description: string;
  technologies: string[];
  contributions: string[];
  images: string[];
  demoLink: string;
  githubLink: string;
}

export function Projects() {
  const sectionRef = useRef(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  const t = useTranslations("Projects");
  const projects: ProjectList[] = t.raw("list");

  useEffect(() => {
    projectsRef.current.forEach((project, index) => {
      gsap.fromTo(
        project,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  // Swiper configuration
  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    speed: 600,
    grabCursor: true,
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle>{t("title")}</SectionTitle>

        <div className="space-y-4 md:space-y-8">
          {projects.map((project, index) => (
            <div
              key={`project-${index}`}
              ref={addToRefs}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Project Image Slider */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""} `}>
                <div className="relative group">
                  <Swiper {...swiperConfig} className="project-swiper">
                    {project.images.map((image, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${project.title} - Screenshot ${i + 1}`}
                            width={1280}
                            height={1000}
                            className="transition-transform duration-300 max-sm:w-full max-sm:h-full object-contain"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk6objPmKYzSXlW2a3mKhO+1f//Z"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-sm bg-black/50 px-2 py-1 rounded">
                              {i + 1} / {project.images.length}
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* Project Content */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    {t("technologiesUsed")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm border border-primary-200 dark:border-primary-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    {t("keyContributions")}
                  </h4>
                  <ul className="space-y-2">
                    {project.contributions.map((contribution, i) => (
                      <li
                        key={i}
                        className="text-gray-600 dark:text-gray-300 text-sm flex items-start"
                      >
                        <span className="text-primary-500 mr-2 mt-1">•</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  {project.demoLink !== "#" && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm md:text-base gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      {t("liveDemo")}
                    </a>
                  )}
                  {project.githubLink !== "#" && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Github size={16} />
                      {t("sourceCode")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
