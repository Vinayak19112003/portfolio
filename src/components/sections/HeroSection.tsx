'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section id="home" className="relative w-full overflow-hidden bg-background py-32 sm:py-40">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-secondary opacity-30" />
                <div className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300 animate-gradient-xy">
                            Tamil Maran
                        </h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-4 text-2xl font-semibold text-secondary-foreground sm:text-3xl"
                        >
                            Full Stack Developer
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground"
                        >
                            I craft clean, efficient, and responsive web solutions, transforming ideas into reality with modern technologies.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-10 flex items-center justify-center gap-4"
                        >
                            <Button asChild size="lg">
                                <Link href="#contact">Contact Me</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="#projects">View My Work</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
