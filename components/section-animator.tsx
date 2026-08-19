'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface SectionAnimatorProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // Delay redus între elemente
}

export default function SectionAnimator({
  children,
  className = '',
  staggerDelay = 35, // <-- ACUM ELEMENTELE APAR MULT MAI REPEDE (35ms în loc de 100ms)
}: SectionAnimatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Selectează elementele din formular/secțiune
    const targets = container.querySelectorAll(
      'h1, h2, h3, p, button, form, iframe, img, fieldset, [data-animate]'
    );

    const elementsToAnimate = targets.length > 0 ? targets : Array.from(container.children);

    elementsToAnimate.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      htmlEl.classList.add('auto-animate-item');
      htmlEl.style.transitionDelay = `${index * staggerDelay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elementsToAnimate.forEach((el) => el.classList.add('is-visible'));
          } else {
            elementsToAnimate.forEach((el) => el.classList.remove('is-visible'));
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}