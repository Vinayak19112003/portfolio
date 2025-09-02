'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code, ExternalLink, Video, MessageSquareQuote, Target, Milestone } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const projects = [
    {
        title: "Snack Station – Java Console Application",
        description: "A console-based vending machine simulation with persistent item and user balance storage.",
        tags: ["Java", "OOP", "File Handling", "NetBeans", "Git"],
        icon: <Code className="h-8 w-8 text-primary" />,
        screenshotUrl: "https://picsum.photos/600/400",
        videoUrl: "https://picsum.photos/1920/1080",
        contribution: "I designed and implemented the core object-oriented architecture, including the file-based persistence system for inventory and user data, ensuring data integrity between sessions.",
        impact: "This project served as a foundational exercise in Java development, reinforcing key principles of object-oriented programming and data handling in a practical, real-world simulation.",
        testimonial: {
            quote: "A clean, well-structured console application that demonstrates a solid understanding of Java fundamentals.",
            author: "Course Instructor",
        }
    },
    {
        title: "E-Commerce Website – Front-End Development",
        description: "A responsive e-commerce front-end focused on providing a smooth and intuitive user experience.",
        tags: ["HTML", "CSS"],
        icon: <ExternalLink className="h-8 w-8 text-primary" />,
        screenshotUrl: "https://picsum.photos/600/400",
        videoUrl: "https://picsum.photos/1920/1080",
        contribution: "I was solely responsible for translating UI/UX mockups into a fully responsive website, focusing on a mobile-first approach to ensure a seamless experience across all devices.",
        impact: "This project was a deep dive into modern CSS and HTML practices, significantly improving my ability to create visually appealing and highly functional user interfaces from scratch.",
        testimonial: {
            quote: "The attention to detail in the responsive design is excellent. The site looks and works great on every screen size.",
            author: "Peer Reviewer",
        }
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


const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
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

    const screenshotHint = index === 0 ? "code editor" : "ecommerce";
    const videoHint = index === 0 ? "code walkthrough" : "website scroll";


    return (
        <Dialog>
            <motion.div
                ref={cardRef}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                variants={itemVariants}
            >
                <Card 
                    className="flex h-full flex-col glass-card transition-all duration-300 ease-out overflow-hidden" 
                    style={style}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),_hsla(var(--primary),0.2)_0%,_transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <CardHeader className="p-0 relative">
                        <Image src={project.screenshotUrl} alt={project.title} width={600} height={400} className="w-full h-auto" data-ai-hint={screenshotHint} />
                    </CardHeader>
                    <CardContent className="flex-grow p-6">
                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                         <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                       <DialogTrigger asChild>
                           <Button variant="outline" className="w-full">View Details</Button>
                       </DialogTrigger>
                    </CardFooter>
                </Card>
            </motion.div>
             <DialogContent className="sm:max-w-[800px] glass-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                         <Image src={project.videoUrl} alt={`Video walkthrough for ${project.title}`} fill objectFit="cover" data-ai-hint={videoHint} />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Video className="h-12 w-12 text-white/70" />
                         </div>
                    </div>
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Milestone /> My Contribution</h3>
                        <p className="text-muted-foreground">{project.contribution}</p>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Target /> Project Impact</h3>
                        <p className="text-muted-foreground">{project.impact}</p>
                    </div>
                    {project.testimonial && (
                         <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><MessageSquareQuote /> Testimonial</h3>
                            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                                <p>"{project.testimonial.quote}"</p>
                                <cite className="mt-2 block not-italic font-semibold text-right">- {project.testimonial.author}</cite>
                            </blockquote>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
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
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
