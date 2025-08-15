'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { TechIcon, type TechName } from '@/components/icons/TechIcons';

const skills: { name: TechName; title: string }[] = [
    { name: 'html', title: 'HTML' },
    { name: 'css', title: 'CSS' },
    { name: 'javascript', title: 'JavaScript' },
    { name: 'react', title: 'React' },
    { name: 'nodejs', title: 'Node.js' },
    { name: 'tailwind', title: 'Tailwind CSS' },
    { name: 'java', title: 'Java' },
    { name: 'mongodb', title: 'MongoDB' },
    { name: 'mysql', title: 'MySQL' },
    { name: 'git', title: 'Git' },
];

export function OrbitingSkills() {
    const radiusDesktop = 280;
    const radiusMobile = 160;

    return (
        <div className="relative flex h-[400px] w-full items-center justify-center md:h-[700px]">
            <div className="absolute flex h-28 w-28 items-center justify-center rounded-full bg-card shadow-xl md:h-40 md:w-40">
                <span className="text-center text-lg font-bold text-foreground md:text-2xl">Tech Stack</span>
            </div>
            
            {/* Desktop Orbit */}
            <motion.div
                className="absolute hidden h-full w-full md:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
                {skills.map((skill, i) => {
                    const angle = (i / skills.length) * 2 * Math.PI;
                    const x = Math.cos(angle) * radiusDesktop;
                    const y = Math.sin(angle) * radiusDesktop;
                    return (
                        <div
                            key={`${skill.name}-desktop`}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                            }}
                        >
                            <motion.div
                                className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-card p-4 shadow-lg md:h-24 md:w-24"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                            >
                                <TechIcon name={skill.name} className="h-full w-full text-primary" />
                                <span className="absolute -bottom-8 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">{skill.title}</span>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Mobile Orbit */}
             <motion.div
                className="absolute h-full w-full md:hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
                {skills.slice(0, 6).map((skill, i) => {
                    const angle = (i / 6) * 2 * Math.PI;
                    const x = Math.cos(angle) * radiusMobile;
                    const y = Math.sin(angle) * radiusMobile;
                    return (
                        <div
                            key={`${skill.name}-mobile`}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                            }}
                        >
                            <motion.div
                                className="group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-card p-3 shadow-lg"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                            >
                                <TechIcon name={skill.name} className="h-full w-full text-primary" />
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
