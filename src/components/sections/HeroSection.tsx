'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section id="home" className="relative w-full overflow-hidden bg-background py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Tamil Maran
                        </h1>
                        <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
                            Full Stack Developer
                        </h2>
                        <p className="mt-4 text-xl text-muted-foreground">
                            Building clean, efficient, and responsive web solutions.
                        </p>
                        <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
                            A highly motivated Full Stack Developer skilled in creating responsive web interfaces, developing RESTful APIs, and writing clean, efficient code.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Button asChild size="lg">
                                <Link href="#contact">Contact Me</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="#projects">View My Work</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
