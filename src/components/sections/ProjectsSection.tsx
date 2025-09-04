'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, ExternalLink } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const projects = [
    {
        title: "MRI-Based Brain Tumor Image Detection using CNN and Deep Learning",
        description: "AI-based system for detecting brain tumors in MRI scans.",
        tags: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Flask", "MySQL"],
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        link: "https://github.com/mohamedsaleem07/portfolio-assets"
    },
    {
        title: "Portfolio Website",
        description: "A responsive personal portfolio to showcase my skills and projects.",
        tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
        icon: <ExternalLink className="h-8 w-8 text-primary" />,
        link: "https://github.com/mohamedsaleem07/portfolio-assets"
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
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card 
                    className="flex h-full flex-col glass-card transition-all duration-300 ease-out overflow-hidden" 
                    style={style}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),_hsla(var(--primary),0.2)_0%,_transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <CardHeader className="flex flex-row items-start gap-4 p-6">
                        <div className="rounded-full bg-primary/10 p-3 mt-1">
                           {project.icon}
                        </div>
                        <div>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <CardDescription className="text-base text-muted-foreground">{project.description}</CardDescription>
                        </div>
                         {project.link && (
                            <div className="ml-auto text-muted-foreground group-hover:text-primary transition-colors">
                                <ExternalLink className="h-5 w-5" />
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="flex-grow p-6 pt-0">
                         <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <p className="text-sm text-muted-foreground">Click to view on GitHub</p>
                    </CardFooter>
                </Card>
            </Link>
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
                        A selection of projects I've worked on, showcasing my skills and contributions.
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
