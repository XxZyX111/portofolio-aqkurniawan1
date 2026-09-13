import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import CursorGlow from '@/components/CursorGlow';
import ScrollReveal from '@/components/ScrollReveal';
import HexagonDecor from '@/components/HexagonDecor';

const Index = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <HexagonDecor />
      <CursorGlow />
      <Navbar />
      <Hero />
      <ScrollReveal direction="up">
        <Skills />
      </ScrollReveal>
      <ScrollReveal direction="left">
        <Projects />
      </ScrollReveal>
      <ScrollReveal direction="right">
        <Education />
      </ScrollReveal>
      <ScrollReveal direction="left">
        <Experience />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <Contact />
      </ScrollReveal>
    </div>
  );
};

export default Index;
