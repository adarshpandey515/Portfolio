'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              I&apos;m a passionate full-stack developer with over 3 years of experience in creating 
              digital solutions that make a difference. My journey in tech started with a curiosity 
              about how things work, and it has evolved into a career dedicated to building 
              exceptional user experiences.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              I specialize in modern web technologies including React, Next.js, Node.js, and 
              cloud platforms. I love turning complex problems into simple, beautiful, and 
              intuitive solutions.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-500 mb-2">15+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">3+</h3>
                <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-500 mb-2">10+</h3>
                <p className="text-gray-600 dark:text-gray-400">Technologies</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-2">50+</h3>
                <p className="text-gray-600 dark:text-gray-400">GitHub Repositories</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-8xl font-bold opacity-30">AP</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm opacity-80">Adarsh Pandey</p>
                <p className="text-xs opacity-60">Full-Stack Developer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}