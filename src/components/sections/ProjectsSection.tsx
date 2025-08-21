'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink } from 'lucide-react';
import React from 'react';

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


const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = (y / height - 0.5) * -25;
        const rotateY = (x / width - 0.5) * 25;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
            '--glow-x': `${x}px`,
            '--glow-y': `${y}px`,
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        });
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            variants={itemVariants}
        >
            <Card 
                className="flex h-full flex-col glass-card transition-all duration-300 ease-out" 
                style={style}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),_hsla(var(--primary),0.2)_0%,_transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
    );
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
                    className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}