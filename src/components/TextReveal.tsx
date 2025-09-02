'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Main App Component
export default function TextReveal() {
  const textToAnimate = "I am currently pursuing my Bachelor of Engineering in Computer Science and Engineering at St. Joseph’s College of Engineering and Technology, Thanjavur (Anna University). With a strong interest in Artificial Intelligence, Web Development, and Data Science, I have worked on academic projects and training programs that helped me gain practical skills in software development and machine learning. My recent project focused on MRI-Based Brain Tumor Detection using CNN and Deep Learning methods, where I applied Python, TensorFlow, and image processing techniques to create a reliable AI-driven diagnostic tool. I am eager to grow as a developer, contribute to impactful projects, and continuously enhance my technical and soft skills.";
  const words = textToAnimate.split(" ");

  // Variants for the container to orchestrate the animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.02 * i },
    }),
  };

  // Variants for each word to create a smoother smoke effect
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <div className="flex items-center justify-center font-sans p-4">
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: 'center' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-lg font-medium text-center mask-r-from-0.5 max-w-5xl leading-relaxed text-muted-foreground"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ marginRight: "8px", marginTop: "8px" }} // Adjust spacing for paragraph
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
