'use client'
import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    children: React.ReactNode;
    href?: string;
}

export default function ShimmerButton({ children, className, href, ...props }: ShimmerButtonProps) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      {...(props as any)}
      className={cn("relative inline-flex items-center justify-center p-[1.5px] bg-gray-800 rounded-full overflow-hidden group", className)}
    >
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, hsl(var(--primary)), transparent 50%)',
            animation: 'shimmer-spin 3.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-sm font-medium text-white bg-gray-900 rounded-full group-hover:bg-gray-800 transition-colors duration-300">
            {children}
        </span>
    </Tag>
  );
}
