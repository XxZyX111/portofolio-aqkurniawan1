import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Github, Linkedin, Instagram } from 'lucide-react';
import EasterEgg from './EasterEgg';
import pepeEmoji from '@/assets/pepe-emoji.png';
import foxCopyEmoji from '@/assets/fox-copy-emoji.png';
import foxEmoji from '@/assets/fox-emoji.png';

const footerEmojiSrc = Math.random() < 1 / 15 ? pepeEmoji : foxEmoji;

const Contact = () => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aelkurniawan13@gmail.com');
    showToast('Successfully Copied!');
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+62 813 2241 5930');
    showToast('Successfully Copied!');
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">Contact Me</h2>
        <p className="text-muted-foreground">If you wanna discuss about commission work or something else, feel free to reach out!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <div className="bg-card border border-border rounded-xl p-6 space-y-3">
          <button
            onClick={copyEmail}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
            data-testid="button-copy-email"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium truncate">aelkurniawan13@gmail.com</p>
            </div>
            <Copy className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>

          <button
            onClick={copyPhone}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
            data-testid="button-copy-phone"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">+62 813 2241 5930</p>
            </div>
            <Copy className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">Or connect with me on social media</p>
          <div className="flex justify-center gap-3">
            <a href="https://github.com/XxZyX111" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all" data-testid="link-github">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/aqeela-k-1b0494325/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all" data-testid="link-linkedin">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/qeela_kurniawan/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all" data-testid="link-instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src={footerEmojiSrc}
            alt=""
            className="w-12 h-12"
            data-testid="img-footer-emoji"
          />
        </div>
      </motion.div>

      <div className="relative mt-16 pt-8 border-t border-border">
        <p className="text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Aqeela Kurniawan. All Rights Reserved
        </p>
        <EasterEgg />
      </div>

      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
            style={{
              background: '#16a34a',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
            }}
            data-testid="toast-copy-success"
          >
            <img src={foxCopyEmoji} alt="" className="w-6 h-6" draggable={false} />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
