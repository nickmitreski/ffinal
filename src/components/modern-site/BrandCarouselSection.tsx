import React from 'react';
import { motion } from 'framer-motion';
import { spacing, typography } from '../../theme/theme';

const brandLogos = [
  '/images/brands/1.png',
  '/images/brands/2.png',
  '/images/brands/3.png',
  '/images/brands/4.png',
  '/images/brands/5.png',
  '/images/brands/6.png',
  '/images/brands/7.png',
  '/images/brands/8.png',
  '/images/brands/9.png',
  '/images/brands/11.png',
  '/images/brands/12.png',
  '/images/brands/13.png',
  '/images/brands/14.png',
  '/images/brands/15.png',
  '/images/brands/16.png',
  '/images/brands/17.png',
  '/images/brands/18.png',
  '/images/brands/19.png',
  '/images/brands/20.png',
  '/images/brands/21.png',
  '/images/brands/22.png',
  '/images/brands/23.png',
  '/images/brands/24.png',
];

interface BrandCarouselSectionProps {
  className?: string;
}

export const BrandCarouselSection: React.FC<BrandCarouselSectionProps> = ({ className = "" }) => {
  return (
    <section className={`py-12 overflow-hidden ${className}`}>
      <div className={`container mx-auto ${spacing.container.padding} text-center mb-6`}>
        <h2 className={`${typography.fontSize.xl} ${typography.fontFamily.light} ${typography.tracking.tight} text-gray-300`}>
          trusted by
        </h2>
      </div>
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-100%'],
          transition: {
            ease: 'linear',
            duration: 25, // Slightly faster duration for more noticeable movement
            repeat: Infinity,
          },
        }}
      >
        {brandLogos.map((logo, index) => (
          <img 
            key={index} 
            src={logo} 
            alt="Brand Logo" 
            className="h-16 mx-10 inline-block filter grayscale-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        ))}
         {/* Duplicate logos for seamless loop */}
         {brandLogos.map((logo, index) => (
          <img 
            key={index + brandLogos.length} 
            src={logo} 
            alt="Brand Logo" 
            className="h-16 mx-10 inline-block filter grayscale-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        ))}
      </motion.div>
    </section>
  );
}; 