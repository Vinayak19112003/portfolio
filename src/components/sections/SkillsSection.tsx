'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Code, Database, Globe, Palette, Server, Wrench } from 'lucide-react';
import React from 'react';
import { TechIcon, TechName } from '../icons/TechIcons';

interface Skill {
    name: TechName;
    label: string;
}

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    skills: Skill[];
}

const skillData: SkillCategory[] = [
    {
        title: 'Languages',
        icon: <Code className="h-8 w-8 text-primary" />,
        skills: [
            { name: 'python', label: 'Python' },
            { name: 'c', label: 'C' },
            { name: 'java', label: 'Java' },
            { name: 'javascript', label: 'JavaScript' },
            { name: 'html', label: 'HTML' },
            { name: 'css', label: 'CSS' },
        ],
    },
    {
        title: 'Frontend',
        icon: <Palette className="h-8 w-8 text-primary" />,
        skills: [
            { name: 'react', label: 'React.js' },
            { name: 'tailwind', label: 'Tailwind CSS' },
            { name: 'bootstrap', label: 'Bootstrap' },
        ],
    },
    {
        title: 'Backend & Database',
        icon: <Server className="h-8 w-8 text-primary" />,
        skills: [
            { name: 'flask', label: 'Flask' },
            { name: 'mysql', label: 'MySQL' },
        ],
    },
    {
        title: 'AI/ML & Data Science',
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        skills: [
            { name: 'tensorflow', label: 'TensorFlow' },
            { name: 'keras', label: 'Keras' },
            { name: 'pandas', label: 'Pandas' },
            { name: 'numpy', label: 'NumPy' },
        ],
    },
    {
        title: 'Tools & Platforms',
        icon: <Wrench className="h-8 w-8 text-primary" />,
        skills: [
            { name: 'git', label: 'Git & GitHub' },
            { name: 'vscode', label: 'VS Code' },
            { name: 'figma', label: 'Figma' },
        ],
    },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


const SkillCard = ({ category }: { category: SkillCategory }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = (y / height - 0.5) * -15;
        const rotateY = (x / width - 0.5) * 15;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
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
            <div 
                className="flex h-full flex-col glass-card transition-all duration-300 ease-out rounded-xl p-6 group" 
                style={style}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),_hsla(var(--primary),0.15)_0%,_transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center gap-4 mb-4">
                    {category.icon}
                    <h3 className="text-xl font-bold text-primary-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    {category.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
                            <TechIcon name={skill.name} className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-foreground">{skill.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


export function SkillsSection() {
    return (
        <motion.section
            id="skills"
            className="w-full overflow-hidden py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skills & Technologies</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        The tools and technologies I use to build modern applications.
                    </p>
                </div>
                <motion.div
                    className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {skillData.map((category) => (
                        <SkillCard key={category.title} category={category} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
