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
        <path d="M23.999 11.02a.973.973 0 00-.973-.972h-3.33a.973.973 0 000 1.944h2.24l-3.328 3.328a.973.973 0 00.688 1.661c.253 0 .506-.098.697-.289l3.32-3.32v2.24a.973.973 0 001.944 0V11.02zM12 16.94a4.94 4.94 0 110-9.88 4.94 4.94 0 010 9.88zm0-11.824A6.882 6.882 0 1012 18.88a6.882 6.882 0 000-13.764zm-5.027 8.848a.973.973 0 10-1.376 1.376L9.8 19.344a4.914 4.914 0 01-3.419-1.421 4.94 4.94 0 116.27-6.27L8.03 7.03a.973.973 0 10-1.376-1.376L2.45 9.858a.973.973 0 000 1.376l4.522 4.528zM12 1.077A10.923 10.923 0 1012 22.923 10.923 10.923 0 0012 1.077z" fill="#F05033"/>
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
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="java-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#5382a1'}} />
            <stop offset="100%" style={{stopColor: '#f89820'}} />
          </linearGradient>
        </defs>
        <path d="M20.344 14.156c.156.625.313 1.25.313 1.875 0 .938-.313 1.688-.938 2.25-.625.563-1.563.844-2.813.844-1.063 0-1.938-.375-2.625-1.125-.688-.75-1.031-1.719-1.031-2.875s.344-2.188 1.031-2.938c.688-.75 1.656-1.125 2.938-1.125.75 0 1.438.188 2.063.563.625.375 1.125.906 1.5 1.594.375.688.563 1.5.563 2.438zm-3.875 2.125c-.438-.313-.938-.469-1.5-.469-.563 0-1.031.156-1.406.469-.375.313-.563.703-.563 1.188 0 .438.188.813.563 1.125.375.313.844.469 1.406.469.625 0 1.156-.156 1.594-.469.438-.313.656-.688.656-1.125s-.219-.875-.656-1.188zm-5.313-2.125c.688.656 1.188 1.438 1.5 2.344.313.906.469 1.875.469 2.906s-.156 1.969-.469 2.844c-.313.875-.781 1.625-1.406 2.25s-1.406 1.063-2.344 1.344c-.938.281-1.875.422-2.813.422-1.063 0-2-.188-2.813-.563-.813-.375-1.5-.875-2.063-1.5s-.938-1.344-1.125-2.156c-.188-.813-.281-1.688-.281-2.625h3.313c0 .75.094 1.406.281 1.969.188.563.469 1.031.844 1.406.375.375.844.563 1.406.563.5 0 .938-.125 1.313-.375s.563-.625.563-1.125c0-.375-.094-.688-.281-1s-.438-.531-.75-.719l-1.188-.438c-.938-.344-1.688-.75-2.25-1.219-.563-.469-.844-1.094-.844-1.875 0-.438.094-.875.281-1.281.188-.406.469-.75.844-1.031s.813-.469 1.313-.625c.5-.156 1.031-.234 1.594-.234.875 0 1.625.156 2.25.469s1.125.75 1.469 1.313zm-3.688.188c-.25-.281-.594-.422-.969-.422-.375 0-.688.125-1 .375-.313.25-.469.594-.469 1 0 .344.125.625.375.875s.594.438 1.031.547l.719.219c1.375.422 2.063.938 2.063 1.563 0 .438-.156.781-.469 1.031-.313.25-.719.375-1.219.375-.438 0-.813-.125-1.125-.375s-.531-.563-.656-.938H2.4c.063.563.281 1.063.625 1.5.344.438.75.781 1.219.969.469.188 1.031.281 1.688.281.75 0 1.406-.156 1.969-.469.563-.313.844-.688.844-1.156s-.188-.875-.563-1.219c-.375-.344-.969-.609-1.813-.797l-.719-.188c-.813-.25-1.406-.563-1.813-.938-.406-.375-.609-.844-.609-1.375s.156-.859.469-1.172c.313-.313.75-.469 1.313-.469s.969.125 1.344.375c.375.25.625.547.719.906h2.844z" fill="url(#java-gradient)" />
      </svg>
    ),
    color: '#f89820'
  },
  mysql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12.01 2C6.49 2 2 6.49 2 12.01s4.49 10.01 10.01 10.01 10.01-4.49 10.01-10.01S17.53 2 12.01 2zm6.77 6.13c0 .4-.32.72-.72.72h-1.3v3.74c0 .4-.32.72-.72.72h-.96c-.4 0-.72-.32-.72-.72V8.85h-.89v3.02c0 .4-.32.72-.72.72H12.03c-.4 0-.72-.32-.72-.72V8.85h-.89v3.74c0 .4-.32.72-.72.72H8.74c-.4 0-.72-.32-.72-.72V8.85H6.68c-.4 0-.72-.32-.72-.72V7.17c0-.4.32-.72.72-.72H18.06c.4 0 .72.32.72.72v.96zm-2.96 7.72c0 .11-.09.2-.2.2h-1.43c-.11 0-.2-.09-.2-.2v-.64h2.03v.64zm-6.01 0c0 .11-.09.2-.2.2H8.18c-.11 0-.2-.09-.2-.2v-.64h2.03v.64zm5.16 1.63v-.59h-2.12c-.4 0-.72.32-.72.72v.84h-1.92v-.84c0-.4-.32-.72-.72-.72H9.97c-.4 0-.72.32-.72.72v.84H7.33v-.84c0-.4-.32-.72-.72-.72H4.49v.59c-.47.16-.8.59-.8 1.11 0 .64.52 1.16 1.16 1.16h13.29c.64 0 1.16-.52 1.16-1.16 0-.52-.33-.95-.8-.11z" fill="#00758F"/>
      </svg>
    ),
    color: '#00758F'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12.16 3.38A12.11 12.11 0 008.5 14.2a3.17 3.17 0 001 1.54 6.44 6.44 0 004.27 1.48 15.63 15.63 0 004.38-2.4A10.4 10.4 0 0012.16 3.38zm1.43 10.15a.71.71 0 01-.62.38 1.4 1.4 0 01-1.18-.7 1 1 0 01-.13-1.1 1.13 1.13 0 011.06-.6 1.41 1.41 0 011.17.65.91.91 0 01.12 1 .61.61 0 01-.42.4zm6.56-5.35A11.41 11.41 0 0014 1.35C10.23.8 4.7 4.33 4.19 10.13a10.7 10.7 0 003.42 8.65 11.5 11.5 0 0010.33 1.43c4.85-2 6.33-8 4.32-12.86z" fill="#4DB33D"/>
      </svg>
    ),
    color: '#4DB33D'
  },
  netbeans: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
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
