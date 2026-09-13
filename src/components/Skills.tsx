import { motion } from 'framer-motion';
import skillVideoEditing from '@/assets/skill-video-editing.png';
import skillCanva from '@/assets/skill-canva.jpg';
import skillProgramming from '@/assets/skill-programming.jpg';

const Skills = () => {
  const generalSkills = [
    { name: 'Video Editing', image: skillVideoEditing },
    { name: 'Canva Designer', image: skillCanva },
    { name: 'Programming', image: skillProgramming },
  ];

  const codingSkills = [
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', percent: 90 },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', percent: 85 },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percent: 70 },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percent: 75 },
    { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', percent: 60 },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', percent: 50 },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', percent: 65 },
  ];

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">Skills</h2>
        <p className="text-muted-foreground">Here are some of the skills I've developed over the years</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-4 mb-12"
      >
        {generalSkills.map((skill) => (
          <div
            key={skill.name}
            className="relative rounded-xl overflow-hidden border border-border card-hover h-40 group"
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <h3 className="text-lg font-semibold font-display">{skill.name}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold font-display">Knownable Language</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto space-y-3"
      >
        {codingSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center gap-3"
          >
            <img src={skill.logo} alt={skill.name} className="w-6 h-6 flex-shrink-0 transition-transform duration-500 hover:rotate-[360deg]" />
            <span className="text-sm font-medium w-20 flex-shrink-0">{skill.name}</span>
            <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{skill.percent}%</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
