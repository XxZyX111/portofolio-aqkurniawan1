import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Laptop } from 'lucide-react';
import jhs190Logo from '@/assets/jhs190-logo.png';
import unityLogo from '@/assets/unity-logo.png';
import binusLogo from '@/assets/binus-logo.png';

const educationData = [
  {
    school: 'JHS190',
    fullName: 'Russell Sage Junior High School 190',
    period: '2019 - 2021',
    description:
      'A Junior High School based in Queens, New York serving grades 6-8 with a focus on academic excellence, arts, and technology. Known for a competitive, traditional environment, it offers accelerated courses, including Regents, and prepares students for specialized high schools.',
    logo: jhs190Logo,
    icon: BookOpen,
  },
  {
    school: 'Unity School',
    fullName: 'SMA Unity School',
    period: '2021 - 2024',
    description:
      'An international senior high school that also ranges from early kindergarten all the way to 12th grade high school. Supported by the Cambridge Learning system where students also learn and speak English fluently to achieve academic goals and achievements. I took the IPA/Science class as my High School Major.',
    logo: unityLogo,
    icon: GraduationCap,
  },
  {
    school: 'BINUS University',
    fullName: 'BINUS University',
    period: '2024 - Present',
    description:
      'Majoring as a Software Engineering Major to pursue my career as a software developer and application maker in the future.',
    logo: binusLogo,
    icon: Laptop,
  },
];

const Education = () => {
  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">Educational Journey</h2>
        <p className="text-muted-foreground">The schools and institutions that shaped my path</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border md:hidden" />

        {educationData.map((edu, index) => {
          const isLeft = index % 2 === 0;
          const Icon = edu.icon;
          const isLast = index === educationData.length - 1;

          return (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative mb-12 ${isLast ? 'mb-0' : ''}`}
              data-testid={`card-education-${index}`}
            >
              <div className={`hidden md:flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        className="w-10 h-10 object-contain rounded-md flex-shrink-0 bg-white p-0.5"
                        data-testid={`img-education-logo-${index}`}
                      />
                      <div className={`${isLeft ? 'text-right' : ''}`}>
                        <h3 className="text-base font-bold font-display leading-tight">{edu.school}</h3>
                        <span className="text-xs text-primary font-medium">{edu.period}</span>
                      </div>
                    </div>
                    <p className={`text-muted-foreground text-sm leading-relaxed ${isLeft ? 'text-right' : 'text-left'}`}>
                      {edu.description}
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
                      <img
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        className="w-8 h-8 object-contain rounded-md flex-shrink-0 bg-white p-0.5"
                      />
                      <div>
                        <h3 className="text-sm font-bold font-display leading-tight">{edu.school}</h3>
                        <span className="text-xs text-primary font-medium">{edu.period}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{edu.description}</p>
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

export default Education;
