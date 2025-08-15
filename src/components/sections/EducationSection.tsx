'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export function EducationSection() {
    return (
        <motion.section
            id="education"
            className="w-full py-16 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Education</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        My academic journey and qualifications.
                    </p>
                </div>
                <div className="mt-12 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg"
                    >
                        <Card className="overflow-hidden transition-shadow hover:shadow-xl glowing-border bg-secondary/30">
                            <CardHeader className="flex flex-row items-center gap-4 p-6">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <GraduationCap className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">B.E Computer Science Engineering</CardTitle>
                                    <p className="text-sm text-muted-foreground">2021 – 2025</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 text-muted-foreground">
                                <p><strong>St. Joseph’s College of Engineering and Technology, Thanjavur</strong></p>
                                <p className="mt-2">Pursuing a comprehensive curriculum focused on core computer science principles, software development, and engineering practices.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
