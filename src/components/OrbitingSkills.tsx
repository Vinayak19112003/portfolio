"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'python' | 'c' | 'java' | 'javascript' | 'html' | 'css' | 'react' | 'flask' | 'mysql' | 'tensorflow' | 'git' | 'vscode' | 'figma' | 'bootstrap' | 'numpy' | 'pandas';

type GlowColor = 'cyan' | 'purple' | 'green';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<string, { component: () => React.JSX.Element; color: string }> = {
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M16.22 8.33V4.33c0-.98-.65-1.1-1.12-.23l-2.73 4.95h2.51c.67 0 .97.43.54.95l-5.3 6.68c-.43.52-.13 1.13.54 1.13h3.51v4c0 .98.65 1.1 1.12.23l2.73-4.95h-2.51c-.67 0-.97-.43-.54-.95l5.3-6.68c.43-.52.13-1.13-.54-1.13h-3.7zM8.33 16.22V20c0 .98.65 1.1 1.12.23l2.73-4.95h-2.51c-.67 0-.97-.43-.54-.95L14.43 8.6c.43-.52.13-1.13-.54-1.13H10.4V3.47c0-.98-.65-1.1-1.12-.23L6.55 8.2H9.06c.67 0 .97.43.54.95l-5.3 6.68c-.43.52-.13 1.13.54 1.13h3.51z" fill="#3776AB"/>
      </svg>
    ),
    color: '#3776AB'
  },
  c: {
    component: () => (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#03599C" d="M89.34 8.75A64 64 0 1 0 25.3 117.3a64 64 0 0 0 64.04-108.55zM64 119C33.2 119 9 94.8 9 64S33.2 9 64 9s55 24.8 55 55-24.8 55-55 55z"/>
        <path fill="#03599C" d="M96.8 73.2c-3.2-5.9-8.8-10-15.8-11.4 2.1-2.1 3.5-4.8 3.9-7.8.5-3.7-.5-7.3-2.6-10.2-2.2-2.9-5.4-4.9-8.9-5.5-3.6-.6-7.2.1-10.2 1.9-3 1.9-5.1 4.7-6 8.1-.9 3.3-.5 6.9 1.2 9.9 1.7 2.9 4.6 5.1 7.8 6.1 4.9 1.6 9.4 1.5 13.5.1 1.2-1.6 2-3.5 2.3-5.5h-13.3c-1.3.3-2.6.4-3.9.4-4.6 0-9-2.1-11.9-5.8-3-3.7-4.2-8.4-3.5-13.1.7-4.7 3.4-8.9 7.4-11.9 4-3 9-4.2 14.1-3.6 5.1.7 9.6 3.3 12.7 7.3s4.4 9.1 3.6 14.1c-.7 5-3.5 9.4-7.6 12.6-2.1 1.6-4.5 2.7-7.1 3.2 7.4-.4 13.7 3.8 16.6 10.3.6 1.4.9 2.9 1 4.5.1 1.5-.1 3.1-.6 4.6-2 5.7-6.7 10-12.7 11.2-6 1.3-12-.4-16.6-4.1-4.5-3.7-7.2-9-7.3-14.7-.1-5.7 2.4-11.1 6.5-14.9 1.3-1.3 2.9-2.3 4.5-3.1-5.5 3.9-8.4 10.4-7.4 17.1.8 5.4 4.6 10 9.7 11.9 5.1 2 11 .8 14.9-2.9s6.1-9 5.2-14.5c-.7-3.8-2.9-7.2-6.1-9.3z"/>
      </svg>
    ),
    color: '#03599C'
  },
  java: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" className="w-full h-full">
        <title>Java</title>
        <path fill="#5382a1" d="M8.852 18.56s-1.052.612.747.82c2.176.248 3.29.212 5.688-.241 0 0 .634.398 1.518.743-5.41 2.315-12.236-.134-7.953-1.322zM8.276 15.762s-1.18.875.622 1.063c2.325.24 4.158.26 7.322-.352 0 0 .44.448 1.131.692-6.53 1.915-13.772.15-9.075-1.403z"/>
        <path fill="#f89820" d="M13.762 10.83c1.324 1.523-.347 2.897-.347 2.897s3.361-1.735 1.816-3.902c-1.439-1.99-2.547-2.977 3.44-6.39 0 .001-9.4 2.34-4.909 7.395z"/>
        <path fill="#5382a1" d="M20.24 20.17s.777.64-.855 1.137c-3.102.94-12.904 1.223-15.625.037-.979-.426.856-1.015 1.436-1.14.604-.13.95-.106.95-.106-1.093-.77-7.062 1.51-3.031 2.165 10.987 1.782 20.02-.805 17.125-2.093z"/>
        <path fill="#5382a1" d="M9.488 12.636s-5.003 1.19-1.77 1.626c1.364.182 4.084.14 6.617-.068 2.07-.173 4.14-.542 4.14-.542s-.729.312-1.257.671c-5.08 1.335-14.89.713-12.063-.65 2.393-1.158 4.333-.994 4.333-.994z"/>
      </svg>
    ),
    color: '#f89820'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  flask: {
      component: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#000" d="M12.5 2.25c-4.97 0-9.47 3.3-10.36 8.04-.34 1.83.15 3.65 1.34 5.04 1.2 1.4 2.93 2.22 4.78 2.45v-2.2c-1.3-.2-2.4-1.02-3-2.22-.6-1.2-.7-2.6-.2-3.8.7-1.8 2.5-3 4.5-3h.4V2.25zM12.5 7.75V3.75c1.1 0 2.2.2 3.2.7.9.4 1.8.9 2.5 1.6s1.2 1.6 1.6 2.5.6 1.8.7 2.8h-4.3c-.6-1.1-1.6-2.1-2.7-2.6zM22.5 13.25h-5.8v4.5c1.4.2 2.8-.2 3.9-1.1s1.8-2.2 2-3.6v-.3c-.1-.1-.2-.2-.2-.2zm-12 5.5v4.2c2.2 0 4.3-.6 6-1.8 1.8-1.2 3-2.9 3.6-4.9h-5.3c-.8.8-1.8 1.4-2.8 1.8-.5.2-1 .3-1.5.4z"/></svg>
      ),
      color: '#000000'
  },
  mysql: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" className="w-full h-full">
        <title>MySQL</title>
        <path fill="#4479A1" d="M16.6 0c-.72 0-1.28.06-1.66.19-.38.13-.67.32-.88.57-.2.26-.37.6-.49 1.03-.12.43-.22.94-.28 1.53a31.8 31.8 0 0 0-.13 4.43c.1 1.94.44 3.48 1.01 4.62.57 1.15 1.44 2.19 2.63 3.13 1.19.94 2.58 1.72 4.17 2.33a14.62 14.62 0 0 0 5.28.84h.1c.68 0 1.15-.09 1.43-.28.28-.19.42-.43.42-.71 0-.3-.18-.56-.53-.79-.35-.22-.9-.44-1.63-.64-.73-.21-1.48-.38-2.25-.51-1.68-.3-3.03-.72-4.05-1.27-1.02-.55-1.8-1.2-2.33-1.94a4.5 4.5 0 0 1-.77-2.04c0-.39.1-.74.3-1.06.2-.31.48-.56.84-.73.36-.18.78-.27 1.25-.27.48 0 .94.06 1.39.19.45.12.89.27 1.31.46.42.19.81.4 1.17.62l.54-.95c-.42-.26-.87-.49-1.35-.7a9.6 9.6 0 0 0-1.5-.52 7.07 7.07 0 0 0-1.77-.21c-.94 0-1.75.15-2.42.45-.68.3-1.21.7-1.6 1.19-.39.49-.66 1.05-.81 1.69-.15.64-.23 1.32-.23 2.05 0 1.5.39 2.78 1.17 3.83.78 1.06 1.83 1.91 3.14 2.57 1.32.66 2.78 1.11 4.39 1.35.45.06.88.1 1.29.13.41.03.82.04 1.21.04 1.29 0 2.29-.17 3-.52.71-.35 1.22-.8 1.51-1.34.29-.54.44-1.1.44-1.68 0-.73-.2-1.41-.61-2.02-.41-.61-.98-1.14-1.71-1.58-.73-.44-1.57-.8-2.52-1.06-.95-.26-1.95-.44-3-.53a15.78 15.78 0 0 0-2.87 0c-1.15.1-2.21.3-3.17.59Z"/>
      </svg>
    ),
    color: '#4479A1'
  },
  tensorflow: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#FF6F00" d="M12 2.5c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6S15.1 2.5 12 2.5zm0 9.4c-2.1 0-3.8-1.7-3.8-3.8S9.9 4.3 12 4.3s3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8zm0 2.8c-4.9 0-8.9 4-8.9 8.9h1.8c0-3.9 3.2-7.1 7.1-7.1s7.1 3.2 7.1 7.1h1.8c0-4.9-4-8.9-8.9-8.9zm-4.7 4.7c-2.3 0-4.2 1.9-4.2 4.2h1.8c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4h1.8c0-2.3-1.9-4.2-4.2-4.2z"/></svg>
    ),
    color: '#FF6F00'
  },
  git: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <title>Git</title>
        <path d="M23.546 10.92L13.08.454a1.556 1.556 0 0 0-2.2 0l-2.2 2.2 2.78 2.78a1.2 1.2 0 0 1 1.47 1.53l2.68 2.68a1.2 1.2 0 1 1-.85.85l-2.68-2.68a1.2 1.2 0 0 1-1.53-1.47l-2.78-2.78L.454 10.92a1.556 1.556 0 0 0 0 2.2l10.466 10.466a1.556 1.556 0 0 0 2.2 0l10.426-10.426a1.556 1.556 0 0 0 0-2.24z" fill="#F05033"/>
      </svg>
    ),
    color: '#F05033'
  },
  vscode: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.1 3.2l-6.8 6.8-3.1-3.1-8.4 8.4-1.6-1.6L12 5.1l3.1 3.1 6.8-6.8-1.8-1.2zM3.4 13.9l1.6 1.6 8.4-8.4L10.3 4 2 12.3l1.4 1.6zM20.6 10l-3.1 3.1-6.8-6.8L12.5 5l8.1 5z" fill="#007ACC"/>
      </svg>
    ),
    color: '#007ACC'
  },
  figma: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5zm0 17C7.86 19.5 4.5 16.14 4.5 12S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#F24E1E"/>
        <path d="M15.5 12c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5v3.5z" fill="#FF7262"/>
        <path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5v3.5H8.5z" fill="#A259FF"/>
        <path d="M8.5 15.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5h-3.5c-1.93 0-3.5 1.57-3.5 3.5z" fill="#1ABCFE"/>
        <path d="M15.5 8.5c0 1.93-1.57 3.5-3.5 3.5h3.5c0-1.93-1.57-3.5-3.5-3.5z" fill="#0ACF83"/>
      </svg>
    ),
    color: '#1ABCFE'
  },
  bootstrap: {
    component: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#7952B3" d="M22.5 12c0-5.8-4.7-10.5-10.5-10.5S1.5 6.2 1.5 12s4.7 10.5 10.5 10.5S22.5 17.8 22.5 12zm-19 0c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5S3.5 16.7 3.5 12z"/><path fill="#7952B3" d="M8.3 16.3h7.4c1.2 0 2.2-1 2.2-2.2V9.9c0-1.2-1-2.2-2.2-2.2H8.3c-1.2 0-2.2 1-2.2 2.2v4.2c0 1.2 1 2.2 2.2 2.2zm0-1.5h7.4c.4 0 .7-.3.7-.7V9.9c0-.4-.3-.7-.7-.7H8.3c-.4 0-.7.3-.7.7v4.2c0 .4.3.7.7.7z"/><path fill="#7952B3" d="M9.5 11.2h5v1.5h-5z"/></svg>
    ),
    color: '#7952B3'
  },
  numpy: {
      component: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#4D77CF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-8h2v8zm4-5h-2v5h-2v-5h-2v-2h6v2z"/></svg>
      ),
      color: '#4D77CF'
  },
  pandas: {
      component: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#130654" d="M4.5 9.5h3v11h-3zM10.5 9.5h3v11h-3zM16.5 9.5h3v11h-3zM4.5 3.5h15v3h-15z"/></svg>
      ),
      color: '#130654'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit: Core Languages
  { id: 'python', orbitRadius: 80, size: 40, speed: 1, iconType: 'python', phaseShift: 0, glowColor: 'cyan', label: 'Python' },
  { id: 'java', orbitRadius: 80, size: 45, speed: 1, iconType: 'java', phaseShift: Math.PI / 2, glowColor: 'cyan', label: 'Java' },
  { id: 'c', orbitRadius: 80, size: 40, speed: 1, iconType: 'c', phaseShift: Math.PI, glowColor: 'cyan', label: 'C' },
  { id: 'javascript', orbitRadius: 80, size: 40, speed: 1, iconType: 'javascript', phaseShift: 3 * Math.PI / 2, glowColor: 'cyan', label: 'JavaScript' },

  // Middle Orbit: Web & Frameworks
  { id: 'html', orbitRadius: 150, size: 40, speed: -0.6, iconType: 'html', phaseShift: 0, glowColor: 'purple', label: 'HTML' },
  { id: 'css', orbitRadius: 150, size: 40, speed: -0.6, iconType: 'css', phaseShift: Math.PI / 2.5, glowColor: 'purple', label: 'CSS' },
  { id: 'react', orbitRadius: 150, size: 50, speed: -0.6, iconType: 'react', phaseShift: 2 * Math.PI / 2.5, glowColor: 'purple', label: 'React.js' },
  { id: 'flask', orbitRadius: 150, size: 40, speed: -0.6, iconType: 'flask', phaseShift: 3 * Math.PI / 2.5, glowColor: 'purple', label: 'Flask' },
  { id: 'bootstrap', orbitRadius: 150, size: 45, speed: -0.6, iconType: 'bootstrap', phaseShift: 4 * Math.PI / 2.5, glowColor: 'purple', label: 'Bootstrap' },

  // Outer Orbit: Data Science & Tools
  { id: 'tensorflow', orbitRadius: 220, size: 45, speed: 0.4, iconType: 'tensorflow', phaseShift: 0, glowColor: 'green', label: 'TensorFlow' },
  { id: 'numpy', orbitRadius: 220, size: 45, speed: 0.4, iconType: 'numpy', phaseShift: (2 * Math.PI) / 4, glowColor: 'green', label: 'NumPy' },
  { id: 'pandas', orbitRadius: 220, size: 40, speed: 0.4, iconType: 'pandas', phaseShift: (4 * Math.PI) / 4, glowColor: 'green', label: 'Pandas' },
  { id: 'mysql', orbitRadius: 220, size: 50, speed: 0.4, iconType: 'mysql', phaseShift: (6 * Math.PI) / 4, glowColor: 'green', label: 'MySQL' },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
    },
    green: {
      primary: 'rgba(16, 185, 129, 0.4)',
      secondary: 'rgba(16, 185, 129, 0.2)',
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Start animation only on the client
    setTime(0);

    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => (prevTime !== null ? prevTime + deltaTime : 0));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 80, glowColor: 'cyan', delay: 0 },
    { radius: 150, glowColor: 'purple', delay: 1 },
    { radius: 220, glowColor: 'green', delay: 2 }
  ];
  
  if (time === null) {
      // Render nothing or a placeholder on the server and initial client render
      return <div className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[500px] md:h-[500px]" />;
  }

  return (
    <main className="w-full flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[500px] md:h-[500px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}

    