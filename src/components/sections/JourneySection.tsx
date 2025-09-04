'use client';
import { motion } from 'framer-motion';
import { GitCommit, Sparkles, Rocket, Briefcase, GraduationCap } from 'lucide-react';
import React from 'react';

const journeyData = [
    {
        icon: <GitCommit />,
        title: "The First Spark",
        category: "Beginning",
        date: "Early Interest",
        description: "My journey began with a curiosity for how technology works, which quickly evolved into a passion for building intelligent systems. That initial spark of bringing an idea to life through code continues to drive me.",
    },
    {
        icon: <GraduationCap />,
        title: "Academic Foundation",
        category: "Education",
        date: "2021 - 2025",
        description: "Pursuing my B.E. in Computer Science at St. Joseph’s College of Engineering and Technology, where I built a strong foundation in software development and AI.",
    },
    {
        icon: <Briefcase />,
        title: "Hands-On Experience",
        category: "Training",
        date: "2023 - 2024",
        description: "Engaged in specialized training for AI, app design, and data analytics, translating theoretical knowledge into practical, real-world skills.",
    },
    {
        icon: <Sparkles />,
        title: "Embracing Growth",
        category: "Mindset",
        date: "Ongoing",
        description: "I believe the tech world is a space for continuous learning. I embrace every challenge as a learning opportunity, constantly seeking to expand my skills to solve complex problems.",
    },
    {
        icon: <Rocket />,
        title: "Future Aspirations",
        category: "Goal",
        date: "Next Steps",
        description: "My goal is to contribute to innovative projects that make a real-world impact at the intersection of AI and web technology. I am eager to collaborate with teams that push boundaries.",
    },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
   <span
     className={`inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ${className}`}
   >
     {children}
   </span>
);

export function JourneySection() {
    return (
        <motion.section
            id="journey"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Journey & Motivation</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Understanding the 'why' behind the code.
                    </p>
                </div>

                <motion.div
                    className="relative max-w-2xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                     {/* Vertical line */}
                     <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {journeyData.map((item, index) => (
                            <motion.div key={item.title} className="relative group" variants={itemVariants}>
                                <div className="flex items-start gap-6">
                                    {/* Icon and Point */}
                                    <div className="absolute left-4 top-1 -translate-x-1/2 z-10 flex items-center justify-center">
                                         <div className="h-8 w-8 bg-background border-2 border-primary rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                            <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3 pl-16">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                <h3 className="font-semibold text-xl text-primary-foreground transition-colors duration-300 group-hover:text-primary">
                                                    {item.title}
                                                </h3>
                                                <Badge>{item.date}</Badge>
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground">{item.category}</p>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
