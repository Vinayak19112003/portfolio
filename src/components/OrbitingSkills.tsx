"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'git' | 'github' | 'java' | 'mysql' | 'mongodb' | 'netbeans';

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
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
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
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
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
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.012 10.372a.853.853 0 0 0-.853-.853h-3.413a.853.853 0 0 0 0 1.706h2.24l-3.328 3.328a.853.853 0 0 0 .604 1.457.844.844 0 0 0 .603-.25l3.328-3.328v2.24a.853.853 0 1 0 1.706 0v-4.27zm-2.024 8.794a.853.853 0 0 0-.604-1.457.844.844 0 0 0-.603.25l-3.328 3.328v-8.483a.853.853 0 1 0-1.706 0v8.483l-3.328-3.328a.853.853 0 1 0-1.206 1.206l4.98 4.98a.853.853 0 0 0 1.207 0l4.98-4.98a.853.853 0 0 0 0-1.206zM9.01 1.988a.853.853 0 0 0-.604 1.457l3.328 3.328H9.493a.853.853 0 1 0 0 1.706h4.27a.853.853 0 0 0 .853-.853V3.413a.853.853 0 0 0-1.706 0v2.24l-3.328-3.328a.844.844 0 0 0-.603-.25zM6.988 9.92a2.56 2.56 0 1 0 0-5.12 2.56 2.56 0 0 0 0 5.12zm0 1.706a4.267 4.267 0 1 1 0-8.534 4.267 4.267 0 0 1 0 8.534zM1.988 9.92a.853.853 0 1 0 0-1.706H.853a.853.853 0 1 0 0 1.706h1.134zm17.62-5.932a.853.853 0 1 0-1.206 1.206L19.61 6.4a2.549 2.549 0 0 0-3.604 0 2.56 2.56 0 1 0-3.604 3.604l-1.206 1.206a.853.853 0 1 0 1.206 1.206l1.206-1.206a4.254 4.254 0 0 1 3.604 0 4.267 4.267 0 1 1 3.604-3.604l-1.206-1.206z" fill="#F05033"/>
      </svg>
    ),
    color: '#F05033'
  },
  github: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#FFFFFF"/>
      </svg>
    ),
    color: '#FFFFFF'
  },
  java: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.943 5.433c-2.21-.497-3.662.062-4.527.653.208-.94.9-2.617 2.37-2.617 1.01 0 1.94.708 2.157 2.026v-.062zM9.01 19.82c.98-.636 2.02-.917 3.518-.917 2.157 0 3.227.813 3.227 2.188 0 .145-.04.228-.08.288-.06.082-.163.144-.33.144-.145 0-.25-.062-.29-.124-.04-.082-.06-.184-.06-.33 0-.616-.77-1.02-1.79-1.02-1.114 0-2.31.576-2.808 1.083-.5.507-.636.938-.636 1.353 0 .476.124.793.456 1.022.25.163.635.25.96.25.556 0 1.254-.184 1.77-.636l.208.208c-.73.655-1.57.918-2.39.918-1.213 0-2.115-.596-2.645-1.374-.475-.772-.656-1.75-.656-2.58 0-1.295.39-2.45 1.15-3.268zm11.305-6.953c-.35-2.026-1.55-3.6-3.13-4.63-.5-.33-1.01-.595-1.55-.793-.75-.27-1.55-.415-2.43-.415-.81 0-1.57.103-2.31.31-1.35.37-2.5 1.04-3.46 1.968-.94 1.01-1.59 2.22-1.89 3.557-.33 1.332-.31 2.85.04 4.14.35 1.312 1.01 2.5 1.93 3.483 1.17 1.196 2.73 2.027 4.51 2.458 1.93.435 3.92.31 5.48-.37 1.29-.577 2.37-1.48 3.11-2.646.29-.456.54-.96.71-1.48.33-1.03.45-2.1.41-3.226zm-7.94-5.748c1.372 0 2.54.556 2.54 1.832 0 1.853-1.05 2.56-3.03 2.92-1.45.27-2.83.615-2.83 2.146 0 .39.145.617.37.794.16.124.45.228.67.228.45 0 .9-.207 1.25-.536.57-.557 1.09-1.255 1.09-2.126h2.23c0 1.296-.41 2.47-1.15 3.29-.67.75-1.63 1.21-2.73 1.21-1.47 0-2.45-.636-3.09-1.528-.61-1.01-.81-2.266-.81-3.42 0-2.373 1.33-3.374 3.44-3.79 1.29-.25 2.89-.636 2.89-2.228 0-1.05-.75-1.75-1.85-1.75-.98 0-1.75.536-2.25 1.15-.31.414-.58.98-.58 1.48h-2.23c0-.98.25-1.928.81-2.71.61-.832 1.55-1.418 2.69-1.418z" fill="#f89820"/>
      </svg>
    ),
    color: '#f89820'
  },
  mysql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.01,2C6.49,2,2,6.49,2,12.01s4.49,10.01,10.01,10.01,10.01-4.49,10.01-10.01S17.53,2,12.01,2ZM18.78,8.13c0,0.4-0.32,0.72-0.72,0.72h-1.3v3.74c0,0.4-0.32,0.72-0.72,0.72h-0.96c-0.4,0-0.72-0.32-0.72-0.72V8.85h-0.89v3.02c0,0.4-0.32,0.72-0.72,0.72H12.03c-0.4,0-0.72-0.32-0.72-0.72V8.85h-0.89v3.74c0,0.4-0.32,0.72-0.72,0.72H8.74c-0.4,0-0.72-0.32-0.72-0.72V8.85H6.68c-0.4,0-0.72-0.32-0.72-0.72V7.17c0-0.4,0.32-0.72,0.72-0.72H18.06c0.4,0,0.72,0.32,0.72,0.72V8.13ZM15.82,15.85c0,0.11-0.09,0.2-0.2,0.2H14.19c-0.11,0-0.2-0.09-0.2-0.2v-0.64h2.03V15.85ZM9.81,15.85c0,0.11-0.09,0.2-0.2,0.2H8.18c-0.11,0-0.2-0.09-0.2-0.2v-0.64h2.03V15.85Z M18.17,17.48v-0.59h-2.12c-0.4,0-0.72,0.32-0.72,0.72v0.84h-1.92v-0.84c0-0.4-0.32-0.72-0.72-0.72H9.97c-0.4,0-0.72,0.32-0.72,0.72v0.84H7.33v-0.84c0-0.4-0.32-0.72-0.72-0.72H4.49v0.59c-0.47,0.16-0.8,0.59-0.8,1.11,0,0.64,0.52,1.16,1.16,1.16h13.29c0.64,0,1.16-0.52,1.16-1.16C18.97,18.07,18.64,17.64,18.17,17.48Z" fill="#00758F"/>
      </svg>
    ),
    color: '#00758F'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.16,3.38A12.11,12.11,0,0,0,8.5,14.2a3.17,3.17,0,0,0,1,1.54,6.44,6.44,0,0,0,4.27,1.48,15.63,15.63,0,0,0,4.38-2.4A10.4,10.4,0,0,0,12.16,3.38Zm1.43,10.15a.71.71,0,0,1-.62.38,1.4,1.4,0,0,1-1.18-.7,1,1,0,0,1-.13-1.1,1.13,1.13,0,0,1,1.06-.6,1.41,1.41,0,0,1,1.17.65.91.91,0,0,1,.12,1,.61.61,0,0,1-.42.4Zm6.56-5.35A11.41,11.41,0,0,0,14,1.35C10.23.8,4.7,4.33,4.19,10.13a10.7,10.7,0,0,0,3.42,8.65,11.5,11.5,0,0,0,10.33,1.43c4.85-2,6.33-8,4.32-12.86Z" fill="#4DB33D"/>
      </svg>
    ),
    color: '#4DB33D'
  },
  netbeans: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.12 15.19l-3.37-3.37.71-.71 2.66 2.66 5.66-5.66.71.71-6.37 6.37z" fill="#1B6AC6"/>
      </svg>
    ),
    color: '#1B6AC6'
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
  // Inner Orbit
  { 
    id: 'html',
    orbitRadius: 80, 
    size: 40, 
    speed: 1, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'HTML5'
  },
  { 
    id: 'css',
    orbitRadius: 80, 
    size: 45, 
    speed: 1, 
    iconType: 'css', 
    phaseShift: (2 * Math.PI) / 4, 
    glowColor: 'cyan',
    label: 'CSS3'
  },
  { 
    id: 'javascript',
    orbitRadius: 80, 
    size: 40, 
    speed: 1, 
    iconType: 'javascript', 
    phaseShift: (4 * Math.PI) / 4, 
    glowColor: 'cyan',
    label: 'JavaScript'
  },
  { 
    id: 'react',
    orbitRadius: 80, 
    size: 50, 
    speed: 1, 
    iconType: 'react', 
    phaseShift: (6 * Math.PI) / 4, 
    glowColor: 'cyan',
    label: 'React'
  },
  // Middle Orbit
  { 
    id: 'node',
    orbitRadius: 150, 
    size: 45, 
    speed: -0.6, 
    iconType: 'node', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'Node.js'
  },
  { 
    id: 'git',
    orbitRadius: 150, 
    size: 40, 
    speed: -0.6, 
    iconType: 'git', 
    phaseShift: (2 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'Git'
  },
  { 
    id: 'github',
    orbitRadius: 150, 
    size: 40, 
    speed: -0.6, 
    iconType: 'github', 
    phaseShift: (4 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'GitHub'
  },
  { 
    id: 'java',
    orbitRadius: 150, 
    size: 45, 
    speed: -0.6, 
    iconType: 'java', 
    phaseShift: (6 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'Java'
  },
  // Outer Orbit
  { 
    id: 'mysql',
    orbitRadius: 220, 
    size: 50, 
    speed: 0.4, 
    iconType: 'mysql', 
    phaseShift: 0, 
    glowColor: 'green',
    label: 'MySQL'
  },
  { 
    id: 'mongodb',
    orbitRadius: 220, 
    size: 45, 
    speed: 0.4, 
    iconType: 'mongodb', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'green',
    label: 'MongoDB'
  },
  { 
    id: 'netbeans',
    orbitRadius: 220, 
    size: 40, 
    speed: 0.4, 
    iconType: 'netbeans', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'green',
    label: 'NetBeans'
  },
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
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    },
    green: {
      primary: 'rgba(16, 185, 129, 0.4)',
      secondary: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.3)'
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
          border: `1px solid ${colors.border}`,
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
