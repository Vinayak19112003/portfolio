'use client';

import { motion } from 'framer-motion';
import { GitCommit, Sparkles, Rocket } from 'lucide-react';
import React from 'react';

const journeyData = [
    {
        icon: <GitCommit />,
        title: "The First Spark",
        description: "My journey began with a curiosity for how technology works, which quickly evolved into a passion for building intelligent systems. That initial spark of bringing an idea to life through code continues to drive me.",
    },
    {
        icon: <Sparkles />,
        title: "Embracing the Growth Mindset",
        description: "I believe that the tech world is a space for continuous learning. I embrace every challenge as a learning opportunity, constantly seeking to expand my skills in AI and web development to adapt to new technologies and solve complex problems.",
    },
    {
        icon: <Rocket />,
        title: "Future Aspirations",
        description: "My goal is to contribute to innovative projects that make a real-world impact, particularly at the intersection of AI and web technology. I am eager to collaborate with teams that push boundaries and build meaningful software solutions.",
    },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function JourneySection() {
    return (
        <motion.section
            id="journey"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Journey & Motivation</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Understanding the 'why' behind the code.
                    </p>
                </div>

                <motion.div
                    className="mt-16 max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

                        {journeyData.map((item, index) => (
                            <motion.div key={index} className="relative pl-20 pb-12" variants={itemVariants}>
                                <div className="absolute left-8 top-1 -translate-x-1/2">
                                    <div className="h-8 w-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                                        <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-primary-foreground">{item.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
