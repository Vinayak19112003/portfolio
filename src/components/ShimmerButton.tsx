'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    children: React.ReactNode;
    href?: string;
}

export default function ShimmerButton({ children, className, href, ...props }: ShimmerButtonProps) {
  const commonClasses = "relative inline-flex items-center justify-center p-[1.5px] bg-gray-800/80 rounded-full overflow-hidden group backdrop-blur-sm";
  const spanClasses = "relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-sm font-medium text-white bg-gray-900/80 rounded-full group-hover:bg-gray-800/90 transition-colors duration-300";
  
  const content = (
    <>
      <div 
        className="absolute inset-[-5px] z-0 opacity-50 group-hover:opacity-75 transition-opacity"
        style={{
          background: 'conic-gradient(from var(--angle), transparent 25%, hsl(var(--primary)), transparent 50%)',
          animation: 'shimmer-spin 3.5s linear infinite',
        }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'conic-gradient(from var(--angle), transparent 25%, hsl(var(--primary)), transparent 50%)',
          filter: 'blur(15px)',
          animation: 'shimmer-spin 3.5s linear infinite',
        }}
      />
      <span className={spanClasses}>
          {children}
      </span>
    </>
  );

  const motionProps = {
    initial: { y: 0, scale: 1 },
    whileHover: { y: -3, scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
    whileTap: { scale: 0.95 }
  };

  if (href) {
    const Component = href.startsWith('mailto:') || href.startsWith('http') ? 'a' : Link;
    return (
      <motion.div {...motionProps}>
        <Component
          href={href}
          {...(href.startsWith('mailto:') || href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : { passHref: true })}
          className={cn(commonClasses, className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Component>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn(commonClasses, className)}
    >
      {content}
    </motion.button>
  );
}
