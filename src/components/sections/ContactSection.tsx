'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function ContactSection() {
    return (
        <motion.section
            id="contact"
            className="w-full bg-background py-24 sm:py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="mx-auto max-w-2xl text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" variants={itemVariants}>
                        Get in Touch
                    </motion.h2>
                    <motion.p className="mt-4 text-lg leading-8 text-muted-foreground" variants={itemVariants}>
                        I'm currently open to new opportunities. Feel free to reach out if you have a project in mind or just want to connect.
                    </motion.p>
                    <motion.div className="mt-10 flex items-center justify-center gap-x-6" variants={itemVariants}>
                        <Button asChild size="lg">
                            <a href="mailto:stamilmaran4@gmail.com">
                                <Mail className="mr-2 h-4 w-4" /> Email Me
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div
                        className="mt-12 flex flex-wrap justify-center gap-6 text-muted-foreground"
                        variants={itemVariants}
                    >
                        <a href="tel:+916374360455" className="flex items-center gap-2 hover:text-primary">
                            <Phone className="h-5 w-5" />
                            <span>+91 6374360455</span>
                        </a>
                        <Link href="https://linkedin.com/in/stamilmaran" target="_blank" className="flex items-center gap-2 hover:text-primary">
                            <Linkedin className="h-5 w-5" />
                            <span>LinkedIn</span>
                        </Link>
                        <Link href="https://github.com/tamilmaran-s" target="_blank" className="flex items-center gap-2 hover:text-primary">
                            <Github className="h-5 w-5" />
                            <span>GitHub</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
