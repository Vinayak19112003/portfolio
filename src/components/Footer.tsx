import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-card border-t">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {year} H. Mohamed Saleem. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://github.com/mohamedsaleem07" target="_blank" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://www.linkedin.com/in/mohamed-saleem-0341ba382" target="_blank" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
