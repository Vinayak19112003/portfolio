'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import TextReveal from '../TextReveal';

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

export function AboutSection() {
    return (
        <motion.section
            id="about"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="mx-auto max-w-3xl text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" variants={itemVariants}>
                        About Me
                    </motion.h2>
                    <motion.p className="mt-4 text-lg leading-8 text-muted-foreground" variants={itemVariants}>
                        A highly motivated Full Stack Developer with strong knowledge of HTML, CSS, JavaScript, React, Node.js, and MongoDB. Skilled in building responsive web interfaces and developing RESTful APIs. Quick to learn new technologies with a focus on clean, efficient code. Eager to contribute to dynamic development teams and grow as a software professional.
                    </motion.p>
                    <div className="mt-8">
                      <TextReveal />
                    </div>
                    <motion.div
                        className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
                        variants={containerVariants}
                    >
                        <motion.div className="flex items-center gap-2" variants={itemVariants}>
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">Chennai, India</span>
                        </motion.div>
                        <motion.div className="flex items-center gap-2" variants={itemVariants}>
                            <Mail className="h-5 w-5 text-primary" />
                            <a href="mailto:stamilmaran4@gmail.com" className="text-muted-foreground hover:text-primary">
                                stamilmaran4@gmail.com
                            </a>
                        </motion.div>
                        <motion.div className="flex items-center gap-2" variants={itemVariants}>
                            <Phone className="h-5 w-5 text-primary" />
                            <a href="tel:+916374360455" className="text-muted-foreground hover:text-primary">
                                +91 6374360455
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
