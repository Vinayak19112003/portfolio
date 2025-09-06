'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import ShimmerButton from '../ShimmerButton';
import LightRays from '../LightRays';
import '../LightRays.css';

export function HeroSection() {
    return (
        <section id="home" className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32">
            <LightRays />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-sky-400 animate-gradient-xy"
                        style={{
                            textShadow: '0 4px 20px rgba(0, 180, 255, 0.3)',
                        }}
                        >
                            H. Mohamed Saleem
                        </h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-4 text-2xl font-semibold text-secondary-foreground sm:text-3xl"
                        >
                            B.E. Computer Science Student
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground"
                        >
                            Passionate about web technologies & AI. I enjoy learning new tools and frameworks to build innovative solutions that make an impact.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-8 flex items-center justify-center gap-4"
                        >
                            <ShimmerButton href="#contact">Contact Me</ShimmerButton>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/saleem.pdf" target="_blank" rel="noopener noreferrer">View Resume</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
