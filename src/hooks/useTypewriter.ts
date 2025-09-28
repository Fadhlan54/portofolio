"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function useTypewriter(
  taglines: string[],
  speed: number = 50,
  delay: number = 2000
) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const currentTagline = taglines[currentIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing effect
          setCurrentText(currentTagline.substring(0, currentText.length + 1));

          if (currentText === currentTagline) {
            // Start deleting after delay
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          // Deleting effect
          setCurrentText(currentTagline.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % taglines.length);
            setLoopCount((prev) => prev + 1);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    // GSAP animation for cursor
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, taglines, speed, delay]);

  return { currentText, textRef, loopCount };
}
