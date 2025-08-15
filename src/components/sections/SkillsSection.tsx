'use client';

import { motion } from 'framer-motion';
import { OrbitingSkills } from '../OrbitingSkills';

export function SkillsSection() {
    return (
        <motion.section
            id="skills"
            className="w-full overflow-hidden bg-background py-24 sm:py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skills & Technologies</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        The tools and technologies I use to build modern web applications.
                    </p>
                </div>
                <div className="relative mt-8 flex items-center justify-center">
                    <OrbitingSkills />
                </div>
            </div>
        </motion.section>
    );
}
