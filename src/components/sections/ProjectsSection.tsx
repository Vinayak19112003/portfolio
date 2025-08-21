'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Snack Station – Java Console Application",
        description: "A console-based vending machine simulation. Features persistent storage of items and user balances using file handling, along with robust input validation to ensure a smooth user experience.",
        tags: ["Java", "OOP", "File Handling", "NetBeans", "Git"],
        icon: <Code className="h-8 w-8 text-primary" />,
    },
    {
        title: "E-Commerce Website – Front-End Development",
        description: "A responsive e-commerce front-end with a focus on user experience. Implemented smooth navigation, dynamic product layouts, and clear call-to-action elements to guide users.",
        tags: ["HTML", "CSS"],
        icon: <ExternalLink className="h-8 w-8 text-primary" />,
    }
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function ProjectsSection() {
    return (
        <motion.section
            id="projects"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Projects</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        A selection of projects I've worked on.
                    </p>
                </div>
                <motion.div
                    className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="flex h-full flex-col glowing-border glass-card">
                                <CardHeader className="flex flex-row items-start gap-4 p-6">
                                     <div className="rounded-lg bg-primary/10 p-3">
                                        {project.icon}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl">{project.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow p-6 pt-0">
                                    <CardDescription>{project.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <Badge key={i} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
