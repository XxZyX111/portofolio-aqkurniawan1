import { motion } from 'framer-motion';
import { Music, Video, Users } from 'lucide-react';
import julietLogo from '@/assets/juliet-logo.png';
import nipponclubLogo from '@/assets/nipponclub-logo.png';
import clipchampLogo from '@/assets/clipchamp-logo.png';
import capcutLogo from '@/assets/capcut-logo.png';

const Experience = () => {
  const experiences = [
    {
      title: 'Piano Courses',
      period: '2019 - 2021',
      description: 'One of the few hobbies that I did during summer break at Juliet Music and Art Center in 2019 and also competing in a competition back then finishing 3rd place, and I also do it online during the COVID-19 pandemic and concluded in 2021 to pursue my career as a developer.',
      logos: [julietLogo],
      logoSize: 'w-14 h-14',
      logoRounded: 'rounded-xl',
      icon: Music,
    },
    {
      title: 'Video Editor',
      period: '2022 - Present',
      description: 'Creating and editing video content using Microsoft Clipchamp and Capcut.',
      logos: [clipchampLogo, capcutLogo],
      icon: Video,
    },
    {
      title: 'Nippon Club Activist',
      period: '2025 - Present',
      description: 'An active organization at BINUS University that mainly focus on Japanese cultures and helps with the benefits of organizing Events, Trivias, Fun Gathering, and many more!',
      logos: [nipponclubLogo],
      icon: Users,
    },
  ];

  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">Experience</h2>
        <p className="text-muted-foreground">A journey through my experiences and activities</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border md:hidden" />

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const Icon = exp.icon;
          const isLast = index === experiences.length - 1;

          return (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative mb-12 ${isLast ? 'mb-0' : ''}`}
              data-testid={`card-experience-${index}`}
            >
              <div className={`hidden md:flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'flex-row-reverse' : ''}`}>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {exp.logos.map((logo, i) => (
                          <img key={i} src={logo} alt="logo" className={`${exp.logoSize || 'w-8 h-8'} object-contain ${exp.logoRounded || 'rounded'}`} />
                        ))}
                      </div>
                      <div className={`${isLeft ? 'text-right' : ''}`}>
                        <h3 className="text-base font-bold font-display leading-tight">{exp.title}</h3>
                        <span className="text-xs text-primary font-medium">{exp.period}</span>
                      </div>
                    </div>
                    <p className={`text-muted-foreground text-sm leading-relaxed ${isLeft ? 'text-right' : 'text-left'}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="w-2/12 flex justify-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-background"
                  >
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                </div>

                <div className="w-5/12" />
              </div>

              <div className="md:hidden flex items-start gap-4 pl-0">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {exp.logos.map((logo, i) => (
                        <img key={i} src={logo} alt="logo" className={`${exp.logoSize || 'w-8 h-8'} object-contain ${exp.logoRounded || 'rounded'}`} />
                      ))}
                      <div>
                        <h3 className="text-sm font-bold font-display leading-tight">{exp.title}</h3>
                        <span className="text-xs text-primary font-medium">{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
