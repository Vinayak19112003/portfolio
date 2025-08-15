'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    children: React.ReactNode;
    href?: string;
}

export default function ShimmerButton({ children, className, href, ...props }: ShimmerButtonProps) {
  const commonClasses = "relative inline-flex items-center justify-center p-[1.5px] bg-gray-800 rounded-full overflow-hidden group";
  const spanClasses = "relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-sm font-medium text-white bg-gray-900 rounded-full group-hover:bg-gray-800 transition-colors duration-300";
  
  const content = (
    <>
      <div 
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from var(--angle), transparent 25%, hsl(var(--primary)), transparent 50%)',
          animation: 'shimmer-spin 3.5s linear infinite',
        }}
      />
      <span className={spanClasses}>
          {children}
      </span>
    </>
  );

  if (href) {
    if (href.startsWith('mailto:') || href.startsWith('http')) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(commonClasses, className)}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }
    return (
      <Link href={href} passHref className={cn(commonClasses, className)} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
      </Link>
    );
  }

  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn(commonClasses, className)}
    >
      {content}
    </button>
  );
}
