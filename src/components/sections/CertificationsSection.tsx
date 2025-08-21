'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import React from 'react';

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

const CertificationCard = () => {
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
                <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="rounded-full bg-primary/10 p-3">
                        <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Full Stack Development</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-muted-foreground">
                    <p><strong>Login360, Velachery, Chennai</strong></p>
                    <p className="mt-2">Completed an intensive certification program covering front-end and back-end technologies, including React, Node.js, and database management.</p>
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
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Certifications</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        My professional training and certifications.
                    </p>
                </div>
                <div className="mt-12 flex justify-center group">
                    <div className="w-full max-w-lg">
                       <CertificationCard />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
