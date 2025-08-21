import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ClientProviders } from '@/components/ClientProviders';
import GridBackground from '@/components/GridBackground';


export const metadata: Metadata = {
  title: 'Tamilmaran | Full Stack Developer',
  description: "The official portfolio of Tamilmaran, a Full Stack Developer specializing in clean, efficient, and responsive web solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <GridBackground />
        <ClientProviders />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
