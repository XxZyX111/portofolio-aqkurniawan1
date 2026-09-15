import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import slide1 from '@/assets/slide-1.jpeg';
import slide2 from '@/assets/slide-2.jpeg';
import slide3 from '@/assets/slide-3.jpeg';
import slide4 from '@/assets/slide-4.jpeg';
import slide5 from '@/assets/slide-5.jpeg';
import waveEmoji from '@/assets/wave-emoji.png';

const slides = [slide1, slide2, slide3, slide4, slide5];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <span className="text-gradient">Aqeela</span>{' '}
              <img src={waveEmoji} alt="wave" className="inline-block w-10 h-10 md:w-12 md:h-12 align-middle" draggable={false} />
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              I'm an 18 year old undergraduate student at{' '}
              <span className="font-semibold" style={{ color: '#f0c020' }}>BINUS University</span> studying Computer Science.
              I'm also a decent video editor mostly using Microsoft Clipchamp or Capcut as my go to.
              I yearn to become a software developer and application maker in the future!
            </motion.p>

          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-border shadow-xl relative">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide}
                    alt={`Aqeela Kurniawan ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-1.5 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-primary w-5' : 'bg-border'
                    }`}
                    data-testid={`button-slide-${index}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
