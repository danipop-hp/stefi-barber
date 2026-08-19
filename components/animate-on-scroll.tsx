'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'zoom-in'
  | 'scale-up';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number; // Intârzierea în milisecunde (ex: 0, 150, 300)
}

export default function AnimateOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Când elementul intră pe ecran -> Fade In
            entry.target.classList.add('is-visible');
          } else {
            // Când elementul iese din ecran -> Fade Out (se resetează)
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.15, // Cât % din element trebuie să fie vizibil
        rootMargin: '0px 0px -50px 0px', // Asigură ieșire/intrare lină pe mobil & desktop
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`animate-base ${animation} ${className}`}
    >
      {children}
    </div>
  );
}