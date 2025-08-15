'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => {
        const element = document.getElementById(item.href.substring(1));
        return element;
      });
      let currentSection = 'home';
      sections.forEach(section => {
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={cn(
      "w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="#home" className="text-xl font-bold text-primary">
          Tamil Maran
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className={cn("relative", activeSection === item.href.substring(1) ? "text-primary" : "")}>
              <Link href={item.href}>
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                  />
                )}
              </Link>
            </Button>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <Button onClick={toggleMenu} variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-background shadow-lg md:hidden"
        >
          <div className="container mx-auto flex flex-col items-start gap-2 p-4">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="w-full justify-start" onClick={toggleMenu}>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
