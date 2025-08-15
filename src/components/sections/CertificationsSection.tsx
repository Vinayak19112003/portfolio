'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export function CertificationsSection() {
    return (
        <motion.section
            id="certifications"
            className="w-full bg-secondary py-24 sm:py-32"
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
                <div className="mt-16 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg"
                    >
                        <Card className="overflow-hidden transition-shadow hover:shadow-xl">
                            <CardHeader className="flex flex-row items-center gap-4 bg-card p-6">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Full Stack Development</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-muted-foreground">
                                <p><strong>Login360, Velachery, Chennai</strong></p>
                                <p className="mt-2">Completed an intensive certification program covering front-end and back-end technologies, including React, Node.js, and database management.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
