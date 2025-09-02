'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import React from 'react';

const certifications = [
    {
        title: "Artificial Intelligence Training",
        issuer: "Fantasy Solution",
        date: "July 2023",
        description: "Completed comprehensive training on AI fundamentals and applications."
    },
    {
        title: "App & Website Design Training",
        issuer: "TATTI",
        date: "March 2024",
        description: "Gained skills in modern UI/UX design principles for web and mobile applications."
    },
    {
        title: "Data Analytics Hands-on Training",
        issuer: "SkillTech Services, Chennai",
        date: "August 2024 (Grade: B+)",
        description: "Practical training in data analysis techniques and tools."
    }
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

const CertificationCard = ({ cert }: { cert: typeof certifications[0] }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = (y / height - 0.5) * -20;
        const rotateY = (x / width - 0.5) * 20;

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
                    <div className="rounded-full bg-primary/10 p-3 mt-1">
                        <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">{cert.issuer}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-1">{cert.date}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-muted-foreground">
                    <p>{cert.description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};


export function CertificationsSection() {
    return (
        <motion.section
            id="certifications"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Certifications</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        My professional training and credentials.
                    </p>
                </div>
                <motion.div
                    className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {certifications.map((cert, index) => (
                       <CertificationCard key={index} cert={cert} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
