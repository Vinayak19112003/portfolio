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
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <title>Git</title>
        <path d="M23.546 10.92L13.08.454a1.556 1.556 0 0 0-2.2 0l-2.2 2.2 2.78 2.78a1.2 1.2 0 0 1 1.47 1.53l2.68 2.68a1.2 1.2 0 1 1-.85.85l-2.68-2.68a1.2 1.2 0 0 1-1.53-1.47l-2.78-2.78L.454 10.92a1.556 1.556 0 0 0 0 2.2l10.466 10.466a1.556 1.556 0 0 0 2.2 0l10.426-10.426a1.556 1.556 0 0 0 0-2.24z" fill="#F05033"/>
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
  mysql: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" className="w-full h-full">
        <title>MySQL</title>
        <path fill="#4479A1" d="M16.6 0c-.72 0-1.28.06-1.66.19-.38.13-.67.32-.88.57-.2.26-.37.6-.49 1.03-.12.43-.22.94-.28 1.53a31.8 31.8 0 0 0-.13 4.43c.1 1.94.44 3.48 1.01 4.62.57 1.15 1.44 2.19 2.63 3.13 1.19.94 2.58 1.72 4.17 2.33a14.62 14.62 0 0 0 5.28.84h.1c.68 0 1.15-.09 1.43-.28.28-.19.42-.43.42-.71 0-.3-.18-.56-.53-.79-.35-.22-.9-.44-1.63-.64-.73-.21-1.48-.38-2.25-.51-1.68-.3-3.03-.72-4.05-1.27-1.02-.55-1.8-1.2-2.33-1.94a4.5 4.5 0 0 1-.77-2.04c0-.39.1-.74.3-1.06.2-.31.48-.56.84-.73.36-.18.78-.27 1.25-.27.48 0 .94.06 1.39.19.45.12.89.27 1.31.46.42.19.81.4 1.17.62l.54-.95c-.42-.26-.87-.49-1.35-.7a9.6 9.6 0 0 0-1.5-.52 7.07 7.07 0 0 0-1.77-.21c-.94 0-1.75.15-2.42.45-.68.3-1.21.7-1.6 1.19-.39.49-.66 1.05-.81 1.69-.15.64-.23 1.32-.23 2.05 0 1.5.39 2.78 1.17 3.83.78 1.06 1.83 1.91 3.14 2.57 1.32.66 2.78 1.11 4.39 1.35.45.06.88.1 1.29.13.41.03.82.04 1.21.04 1.29 0 2.29-.17 3-.52.71-.35 1.22-.8 1.51-1.34.29-.54.44-1.1.44-1.68 0-.73-.2-1.41-.61-2.02-.41-.61-.98-1.14-1.71-1.58-.73-.44-1.57-.8-2.52-1.06-.95-.26-1.95-.44-3-.53a15.78 15.78 0 0 0-2.87 0c-1.15.1-2.21.3-3.17.59Z"/>
      </svg>
    ),
    color: '#4479A1'
  },
  mongodb: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" className="w-full h-full">
        <title>MongoDB</title>
        <path fill="#47A248" d="M12.014 0c-.05 0-.12.02-.18.05-.16.06-.32.14-.47.23-1.66 1.03-3.14 2.41-4.19 4.06-1.41 2.14-2.05 4.71-1.85 7.28.12 1.43.6 2.86 1.33 4.13.94 1.61 2.26 3.01 3.88 3.99.52.32 1.08.59 1.66.8.06.03.15.05.21.01.08-.05.07-.15.09-.23.03-.25.05-.5.07-.75.08-1.22.14-2.44.21-3.66 0-.1-.03-.22.06-.29.09-.05.2.01.28.06.56.33 1.15.62 1.77.83.58.21 1.19.35 1.81.4.04 0 .1.01.13-.03.04-.05.01-.11-.01-.16-.14-.33-.28-.65-.41-.98-.11-.26-.23-.51-.35-.76-.05-.1-.12-.2-.12-.31.01-.12.12-.21.21-.29.78-.67 1.52-1.38 2.18-2.17.86-1.03 1.56-2.23 1.93-3.53.35-1.21.43-2.5.21-3.74-.3-1.73-1.17-3.37-2.38-4.64C15.093 1.48 13.67.63 12.14.15c-.04-.01-.08-.02-.12-.03z"/>
      </svg>
    ),
    color: '#47A248'
  },
  netbeans: {
    component: () => (
      <svg role="img" viewBox="0 0 24 24" className="w-full h-full">
        <title>Apache NetBeans</title>
        <path fill="#1B6AC6" d="M12 .3L1.2 6.3v11.4L12 23.7l10.8-6V6.3L12 .3zm0 1.6l9.4 5.2v10.4L12 22.1l-9.4-5.2V7.1L12 1.9z"/>
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
