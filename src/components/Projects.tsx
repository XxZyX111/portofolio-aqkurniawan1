import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  ExternalLink,
  Github,
  Loader2,
  Star,
} from 'lucide-react';
import {
  GITHUB_PROFILE_URL,
  getGitHubUser,
  getLatestRepositories,
  type GitHubRepository,
} from '@/services/github';

const formatRepositoryName = (name: string) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

const Projects = () => {
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const [user, latestRepositories] = await Promise.all([
          getGitHubUser(),
          getLatestRepositories(5),
        ]);

        setRepoCount(user.public_repos);
        setRepositories(latestRepositories);
      } catch (githubError) {
        console.error('Unable to load GitHub projects:', githubError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadGitHubData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          My <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My five newest public GitHub projects, synced automatically from my account
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Github className="w-8 h-8 text-foreground" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-display text-foreground mb-1">
              GitHub Repositories
            </h3>
            <p className="text-muted-foreground text-sm">
              Check out my public repositories and contributions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              {loading ? (
                <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto" />
              ) : (
                <span className="text-3xl font-bold text-primary font-display">
                  {repoCount ?? '—'}
                </span>
              )}
              <p className="text-xs text-muted-foreground mt-1">Total Repos</p>
            </div>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Visit
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <h3 className="text-xl font-bold font-display text-foreground">
              Latest <span className="text-secondary">Projects</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Automatically shows the 5 newest repositories
            </p>
          </div>

          {loading && (
            <div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              Loading latest projects from GitHub...
            </div>
          )}

          {!loading && error && (
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                I couldn't load the latest repositories right now. You can still view them directly on GitHub.
              </p>
            </div>
          )}

          {!loading && !error && repositories.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">No public repositories found yet.</p>
            </div>
          )}

          {!loading && !error && repositories.length > 0 && (
            <div className="space-y-4">
              {repositories.map((repository, index) => (
                <motion.a
                  key={repository.id}
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="block bg-card border border-border rounded-xl p-6 card-hover group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors break-words">
                        {formatRepositoryName(repository.name)}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {repository.description ?? 'A project from my GitHub repositories.'}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
                    {repository.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        {repository.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Created {formatDate(repository.created_at)}
                    </span>
                    {repository.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5" />
                        {repository.stargazers_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
