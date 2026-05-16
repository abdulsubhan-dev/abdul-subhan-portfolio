import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload,
  FiMenu, FiX, FiCode, FiLayers, FiCpu, FiZap, FiAward,
  FiMonitor, FiDatabase, FiSend, FiChevronRight, FiAperture, FiPenTool
} from "react-icons/fi";
import {
  SiReact, SiPython, SiJavascript, SiHtml5, SiCss,
  SiFlask, SiFastapi, SiMysql, SiCanva, SiFigma,
  SiTailwindcss
} from "react-icons/si";

import { FaWhatsapp } from "react-icons/fa";
// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Services", "Contact"];

const DESIGN_SKILLS = [
  { name: "Graphic Design", icon: <FiLayers />, color: "#a855f7" },
  { name: "Poster Design", icon: <FiAward />, color: "#8b5cf6" },
  { name: "Banner Design", icon: <FiMonitor />, color: "#7c3aed" },
  { name: "Logo Design", icon: <FiZap />, color: "#6d28d9" },
  { name: "Social Media Design", icon: <FiLayers />, color: "#a855f7" },
  { name: "UI/UX Design", icon: <FiCode />, color: "#8b5cf6" },
  { name: "Canva", icon: <SiCanva />, color: "#00C4CC" },
  { name: "Adobe Photoshop", icon: <FiAperture />, color: "#31A8FF" },
  { name: "Adobe Illustrator", icon: <FiPenTool />, color: "#FF9A00" },
];

const PROG_SKILLS = [
  { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
  { name: "CSS", icon: <SiCss />, color: "#1572B6" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "React.js", icon: <SiReact />, color: "#61DAFB" },
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "Flask", icon: <SiFlask />, color: "#a855f7" },
  { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
  { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
  { name: "AI Web Apps", icon: <FiCpu />, color: "#8b5cf6" },
];

const PROJECTS = [
  {
    title: "AI Research Paper Summarizer",
    desc: "An AI-powered web app that summarizes research papers and helps users understand academic content easily.",
    category: "AI Web App",
    tags: ["React", "Python", "FastAPI", "AI API"],
    img: "/images/projects/project1.png",
    hasGithub: true,
    hasDemo: true,    liveUrl: "https://abdulsubhan-dev-ai-research-paper-summarizer.hf.space",
    githubUrl: "https://github.com/abdulsubhan-dev/ai-research-paper-summarizer",
    detailsUrl: "https://abdulsubhan-dev-ai-research-paper-summarizer.hf.space",

    color: "#a855f7",
  },
  {
    title: "AI Board Pattern Exam Paper Generator",
    desc: "A smart paper generator that creates customized exam papers based on board patterns.",
    category: "AI Web App",
    tags: ["React", "Python", "FastAPI", "Gemini API"],
    img: "/images/projects/project2.png",
    hasGithub: true,
    hasDemo: true,    liveUrl: "https://subjan-ai-assistant-for-teachers-exam-paper-generator.hf.space",
    githubUrl: "https://github.com/abdulsubhan-dev/AI-Board-Pattern-Exam-Paper-Generator",
    detailsUrl: "https://subjan-ai-assistant-for-teachers-exam-paper-generator.hf.space",

    color: "#7c3aed",
  },
  {
    title: "Lost and Found Management System",
    desc: "A database-based web system for reporting, managing, and tracking lost and found items.",
    category: "Web + Database",
    tags: ["Flask", "MySQL", "HTML", "CSS"],
    img: "/images/projects/project3.png",
    hasGithub: true,
    hasDemo: true,    liveUrl: "https://web-production-15551.up.railway.app/login",
    githubUrl: "https://github.com/abdulsubhan-dev/lost-found-management-system",
    detailsUrl: "https://web-production-15551.up.railway.app",

    color: "#6366f1",
  },
  {
    title: "Puzzle Brain Game",
    desc: "A creative puzzle game with interactive levels and engaging gameplay mechanics.",
    category: "Game Project",
    tags: ["JavaScript", "HTML", "CSS"],
    img: "/images/projects/project4.png",
    hasGithub: false,
    hasDemo: true,    liveUrl: "https://puzzle-master--abdulsubhantech.replit.app",
    githubUrl: "#",
    detailsUrl: "https://puzzle-master--abdulsubhantech.replit.app",

    color: "#8b5cf6",
  },
  {
    title: "University Posts",
    desc: "Professional campaign design for university branding and student outreach.",
    category: "Graphic Design",
    tags: ["Canva", "Photoshop"],
    img: "/images/projects/project5.png",
    hasGithub: false,
    hasDemo: false,    liveUrl: "#university-admission-designs",
    githubUrl: "#",
    detailsUrl: "#university-admission-designs",

    color: "#a855f7",
  },
];


const UNIVERSITY_ADMISSION_DESIGNS = [
  { img: "/images/university-admission/admission1.png", title: "Admission Open Main Post" },
  { img: "/images/university-admission/admission2.png", title: "Admission Opening Soon Post" },
  { img: "/images/university-admission/admission3.png", title: "BS CS Program Post" },
  { img: "/images/university-admission/admission4.png", title: "Career Opportunities Post" },
  { img: "/images/university-admission/admission5.png", title: "Facilities Highlight Post" },
  { img: "/images/university-admission/admission6.png", title: "Campus Branding Post" },
  { img: "/images/university-admission/admission7.png", title: "Admissions Opening Soon Professional" },
  { img: "/images/university-admission/admission8.png", title: "Celebrating Pak-China Friendship" },
  { img: "/images/university-admission/admission9.png", title: "Celebrating Youm-e-Marka-e-Haq" },
  { img: "/images/university-admission/admission10.png", title: "BS CS Admission Opening Soon" },
];

const SERVICES = [
  { icon: <FiLayers size={28} />, title: "Social Media Design", desc: "Eye-catching posts, stories, and reels designed for engagement and brand identity.", color: "#a855f7" },
  { icon: <FiMonitor size={28} />, title: "Banner Design", desc: "Professional banners for events, websites, and marketing campaigns.", color: "#8b5cf6" },
  { icon: <FiAward size={28} />, title: "Logo Design", desc: "Timeless, memorable logos that define your brand's visual identity.", color: "#7c3aed" },
  { icon: <FiCode size={28} />, title: "UI/UX Design", desc: "Intuitive, beautiful interfaces that delight users and drive conversions.", color: "#6366f1" },
  { icon: <FiGithub size={28} />, title: "Web Development", desc: "Fast, responsive, modern websites built with React and clean code.", color: "#a855f7" },
  { icon: <FiCpu size={28} />, title: "AI Web Apps", desc: "Intelligent web applications powered by AI APIs and modern frameworks.", color: "#8b5cf6" },
  { icon: <FiDatabase size={28} />, title: "Database Projects", desc: "Full-stack data-driven systems with Flask, FastAPI, and MySQL.", color: "#7c3aed" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function GlowOrb({ className, color = "#a855f7", size = 400 }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}

function SectionTitle({ children, sub }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp()} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
      <p className="text-purple-400 text-sm font-semibold tracking-wide uppercase mb-3">{sub}</p>
      <h2 className="text-4xl md:text-5xl font-black font-heading text-white leading-tight">
        {children}
      </h2>
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
    </motion.div>
  );
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className="mx-4 md:mx-8 rounded-2xl px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(10,10,20,0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(168,85,247,0.2)",
          boxShadow: scrolled ? "0 8px 32px rgba(168,85,247,0.15)" : "none",
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          {/* Replace with: <img src="/images/logo.png" alt="AS Logo" className="w-9 h-9 rounded-lg" /> */}
          <img src="/images/logo.png" alt="AS Logo" className="w-9 h-9 rounded-lg object-contain" />
          <span className="font-bold text-white text-lg hidden sm:block">Abdul Subhan</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/cv/Abdul_Subhan_CV.pdf"
          download
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", boxShadow: "0 4px 15px rgba(168,85,247,0.4)" }}
        >
          <FiDownload size={14} /> Download CV
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="w-full text-left px-6 py-4 text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors font-medium"
              >
                {link}
              </button>
            ))}
            <div className="p-4">
              <a
                href="/cv/Abdul_Subhan_CV.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              >
                <FiDownload size={14} /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

const FLOAT_ICONS = [
  { icon: <FiCode />, label: "Code", pos: "top-8 -left-6" },
  { icon: <FiLayers />, label: "Design", pos: "top-1/4 -right-8" },
  { icon: <FiCpu />, label: "AI", pos: "bottom-1/4 -left-10" },
  { icon: <FiZap />, label: "Fast", pos: "bottom-8 -right-4" },
];

const FLOAT_CARDS = [
  { text: "Graphic Design", color: "#a855f7", x: -120, y: -60 },
  { text: "Web Development", color: "#6366f1", x: 100, y: -80 },
  { text: "AI Web Apps", color: "#7c3aed", x: -100, y: 80 },
  { text: "UI/UX Design", color: "#8b5cf6", x: 110, y: 60 },
];

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <GlowOrb className="-top-40 -left-40" color="#a855f7" size={600} />
      <GlowOrb className="-bottom-40 -right-40" color="#6366f1" size={500} />

      <div className="container mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-items-center lg:justify-items-stretch">
        {/* Text */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="z-10 text-center lg:text-left">
          <motion.p variants={fadeUp(0.1)} className="text-purple-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Welcome to my Portfolio
          </motion.p>
          <motion.h1 variants={fadeUp(0.2)} className="text-5xl md:text-6xl lg:text-7xl font-black font-heading text-white leading-[1.05] mb-4">
            Hi, I'm{" "}
            <span
              className="inline-block"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Abdul Subhan
            </span>
          </motion.h1>
          <motion.p variants={fadeUp(0.3)} className="text-2xl md:text-3xl font-bold text-gray-300 mb-2">
            Graphics Designer & Programmer
          </motion.p>
          <motion.p variants={fadeUp(0.35)} className="text-purple-400 font-medium mb-6 text-lg">
            Creative Designs + Smart Web Solutions
          </motion.p>
          <motion.p variants={fadeUp(0.4)} className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            I create modern visual designs, social media posts, banners, logos, UI layouts, and web applications using modern programming and AI tools.
          </motion.p>
          <motion.div variants={fadeUp(0.5)} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 rounded-xl font-semibold text-white border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </button>
            <a
              href="/cv/Abdul_Subhan_CV.pdf"
              download
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-gray-300 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              <FiDownload size={16} /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative flex items-center justify-center w-full max-w-[360px] md:max-w-none"
        >
          {/* Glowing rings */}
          {[200, 270, 340].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-purple-500/20"
              style={{ width: size, height: size }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 340, height: 340, background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Profile image */}
          <motion.div
            className="relative z-10 w-[280px] h-[430px] md:w-[380px] md:h-[560px] flex items-end justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="absolute inset-x-1 top-16 bottom-0 rounded-[2rem]"
              style={{
                background: "linear-gradient(180deg, rgba(168,85,247,0.10), rgba(99,102,241,0.04))",
                border: "1px solid rgba(168,85,247,0.18)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 0 70px rgba(168,85,247,0.22), inset 0 0 40px rgba(99,102,241,0.08)",
              }}
            />
            <div
              className="absolute bottom-4 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(99,102,241,0.18) 35%, transparent 70%)",
                filter: "blur(34px)",
              }}
            />
            <img
              src="/images/profile-full.png"
              alt="Abdul Subhan"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_55px_rgba(168,85,247,0.25)]"
            />
          </motion.div>

          {/* Floating skill cards */}
          {FLOAT_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="absolute px-3 py-2 rounded-xl text-xs font-semibold text-white backdrop-blur-md hidden md:flex items-center gap-1.5"
              style={{
                background: `${card.color}20`,
                border: `1px solid ${card.color}40`,
                x: card.x, y: card.y,
                boxShadow: `0 4px 20px ${card.color}30`,
              }}
              animate={{ y: [card.y - 6, card.y + 6, card.y - 6] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: card.color }} />
              {card.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-purple-500/0 to-purple-500/60" />
        <span className="text-purple-400/60 text-xs tracking-wide uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const highlights = ["Creative Designer", "Web Developer", "AI Projects Builder", "Problem Solver"];

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden text-center lg:text-left">
      <GlowOrb className="top-0 right-0" color="#6366f1" size={400} />
      <div className="container mx-auto w-full px-6 md:px-12">
        <SectionTitle sub="Who I Am">About Me</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-4 justify-items-center lg:justify-items-stretch">
          {/* Card */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative rounded-3xl p-8 md:p-10 w-full max-w-2xl lg:max-w-none"
            style={{
              background: "rgba(168,85,247,0.04)",
              border: "1px solid rgba(168,85,247,0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-purple-500 to-blue-500" />
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Hi, I'm <span className="text-purple-400 font-semibold">Abdul Subhan</span>, a Graphics Designer and Programmer. I create modern visual designs, social media posts, banners, logos, UI layouts, and web applications using modern programming and AI tools.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My goal is to combine creative design with smart programming to build clean, useful, and professional digital solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "Projects", value: "10+" },
                { label: "Skills", value: "18+" },
                { label: "Designs", value: "50+" },
              ].map(({ label, value }) => (
                <div key={label} className="flex-1 min-w-[80px] rounded-2xl p-4 text-center" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-purple-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4 w-full max-w-2xl lg:max-w-none"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h}
                variants={fadeUp(i * 0.1)}
                whileHover={{ scale: 1.04, y: -4 }}
                className="rounded-2xl p-6 cursor-default group transition-all duration-300"
                style={{
                  background: "rgba(168,85,247,0.05)",
                  border: "1px solid rgba(168,85,247,0.15)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors"
                  style={{ background: "rgba(168,85,247,0.15)" }}>
                  {[<FiLayers />, <FiCode />, <FiCpu />, <FiZap />][i]}
                </div>
                <p className="font-bold text-white text-sm leading-tight">{h}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function SkillCard({ skill }) {
  return (
    <motion.div
      variants={fadeUp()}
      whileHover={{ scale: 1.06, y: -5 }}
      className="rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default group transition-all duration-300"
      style={{
        background: "rgba(168,85,247,0.05)",
        border: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      <div
        className="text-2xl transition-all duration-300 group-hover:scale-110"
        style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}80)` }}
      >
        {skill.icon}
      </div>
      <span className="text-xs font-semibold text-gray-300 text-center group-hover:text-white transition-colors">{skill.name}</span>
    </motion.div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative py-24">
      <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="#a855f7" size={500} />
      <div className="container mx-auto w-full px-6 md:px-12">
        <SectionTitle sub="What I Know">My Skills</SectionTitle>
        <div className="space-y-12">
          {[
            { title: "Design Skills", skills: DESIGN_SKILLS, color: "#a855f7" },
            { title: "Programming Skills", skills: PROG_SKILLS, color: "#6366f1" },
          ].map(({ title, skills, color }) => (
            <motion.div key={title} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
              <motion.div variants={fadeUp()} className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
              </motion.div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {skills.map((s) => <SkillCard key={s.name} skill={s} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group rounded-3xl overflow-hidden flex flex-col transition-all duration-500 w-full max-w-md md:max-w-none"
      style={{
        background: "rgba(10,10,20,0.8)",
        border: "1px solid rgba(168,85,247,0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div className="w-full h-full hidden items-center justify-center">
          <span className="text-purple-500/30 text-5xl font-black">{i + 1}</span>
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: "rgba(10,10,20,0.85)" }}
        >
          {p.hasDemo && p.liveUrl && p.liveUrl !== "#" && (
            <a
              href={p.liveUrl}
              target={p.liveUrl.startsWith("#") ? undefined : "_blank"}
              rel={p.liveUrl.startsWith("#") ? undefined : "noopener noreferrer"}
              aria-label={`${p.title} live demo`}
              className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-white hover:bg-purple-500/40 transition-colors"
            >
              <FiExternalLink size={18} />
            </a>
          )}
          {p.hasGithub && p.githubUrl && p.githubUrl !== "#" && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} GitHub repository`}
              className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-white hover:bg-purple-500/40 transition-colors"
            >
              <FiGithub size={18} />
            </a>
          )}
        </div>
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: `${p.color}40`, border: `1px solid ${p.color}60` }}
        >
          {p.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{p.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium text-purple-300" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
              {t}
            </span>
          ))}
        </div>
        <a
          href={p.detailsUrl || "#"}
          target={p.detailsUrl && p.detailsUrl !== "#" && !p.detailsUrl.startsWith("#") ? "_blank" : undefined}
          rel={p.detailsUrl && p.detailsUrl !== "#" && !p.detailsUrl.startsWith("#") ? "noopener noreferrer" : undefined}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 flex items-center justify-center gap-2 ${
            p.detailsUrl && p.detailsUrl !== "#"
              ? "text-purple-400 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10"
              : "text-gray-500 border-white/10 cursor-not-allowed pointer-events-none"
          }`}
        >
          {p.detailsUrl && p.detailsUrl !== "#" ? "View Details" : "Coming Soon"} <FiChevronRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <GlowOrb className="bottom-0 left-0" color="#6366f1" size={400} />
      <div className="container mx-auto w-full px-6 md:px-12">
        <SectionTitle sub="What I've Built">My Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── UNIVERSITY ADMISSION DESIGNS PAGE ───────────────────────────────────────

function UniversityAdmissionDesignsPage({ onBack }) {
  const [active, setActive] = useState(null);

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <GlowOrb className="-top-20 -left-20" color="#a855f7" size={500} />
      <GlowOrb className="bottom-0 right-0" color="#6366f1" size={450} />

      <div className="container mx-auto w-full px-6 md:px-12">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="mb-8 inline-flex items-center gap-2 text-purple-400 hover:text-white transition-colors font-semibold"
        >
          <FiChevronRight className="rotate-180" size={18} />
          Back to Portfolio
        </motion.button>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp(0.05)} className="text-purple-400 text-sm font-semibold tracking-wide uppercase mb-3">
            Graphic Design Project
          </motion.p>
          <motion.h1 variants={fadeUp(0.1)} className="text-4xl md:text-6xl font-black font-heading text-white leading-tight">
            University Admission
            <span
              className="block"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Post Designs
            </span>
          </motion.h1>
          <motion.p variants={fadeUp(0.15)} className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            A dedicated showcase page for my university admission campaign designs. Replace the images below with your real design samples.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          {UNIVERSITY_ADMISSION_DESIGNS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp(i * 0.05)}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActive(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/5] w-full max-w-sm sm:max-w-none"
              style={{
                background: "rgba(10,10,20,0.8)",
                border: "1px solid rgba(168,85,247,0.15)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 items-center justify-center">
                <span className="text-purple-400/40 text-5xl font-black">{i + 1}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-100 flex flex-col justify-end p-5">
                <span className="w-fit px-3 py-1 rounded-full text-xs font-semibold text-purple-200 mb-3" style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  University Design
                </span>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(168,85,247,0.3)", background: "rgba(10,10,20,0.95)" }}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <FiX size={20} />
              </button>
              <img src={active.img} alt={active.title} className="w-full max-h-[80vh] object-contain bg-black/40" />
              <div className="p-4 border-t border-white/10">
                <p className="text-white font-semibold">{active.title}</p>
                <p className="text-purple-400 text-sm">University Admission Design</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative py-24">
      <GlowOrb className="bottom-0 right-0" color="#7c3aed" size={400} />
      <div className="container mx-auto w-full px-6 md:px-12">
        <SectionTitle sub="What I Offer">My Services</SectionTitle>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center"
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp(i * 0.07)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group rounded-3xl p-6 flex flex-col gap-4 transition-all duration-400 cursor-default w-full max-w-sm sm:max-w-none text-center sm:text-left"
              style={{
                background: "rgba(10,10,20,0.7)",
                border: "1px solid rgba(168,85,247,0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${s.color}20`, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = () => {
    // TODO: Connect to backend/EmailJS
    alert("Message sent! (Connect backend to activate)");
  };

  return (
    <section id="contact" ref={ref} className="relative py-24">
      <GlowOrb className="top-0 left-1/4" color="#a855f7" size={400} />
      <div className="container mx-auto w-full px-6 md:px-12">
        <SectionTitle sub="Let's Talk">Get In Touch</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto justify-items-center lg:justify-items-stretch">
          {/* Info */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-6 w-full max-w-xl lg:max-w-none text-center lg:text-left">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm available for freelance work, internships, and collaborative projects. Let's build something amazing together.
            </p>
            {[
              { icon: <FaWhatsapp />, label: "WhatsApp", value: "+92 370 1609255", href: "https://wa.me/923701609255" },
              { icon: <FiMail />, label: "Email", value: "abdulsubhan.design@gmail.com", href: "mailto:abdulsubhan.design@gmail.com" },
              { icon: <FiGithub />, label: "GitHub", value: "abdulsubhan-dev", href: "https://github.com/abdulsubhan-dev" },
              { icon: <FiLinkedin />, label: "LinkedIn", value: "Abdul Subhan", href: "https://www.linkedin.com/in/abdul-subhan-71014840b" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-300 hover:border-purple-500/40"
                style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.15)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 group-hover:text-white transition-colors"
                  style={{ background: "rgba(168,85,247,0.15)" }}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-purple-400 uppercase tracking-wider">{c.label}</p>
                  <p className="text-white font-medium text-sm">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="rounded-3xl p-8 w-full max-w-xl lg:max-w-none"
            style={{ background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.15)", backdropFilter: "blur(20px)" }}
          >
            <div className="space-y-4">
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Abdul Subhan" },
                { id: "email", label: "Your Email", type: "email", placeholder: "you@example.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 bg-white/5 border border-white/10 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 bg-white/5 border border-white/10 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}
              >
                <FiSend size={16} /> Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative border-t border-purple-500/10 py-12">
      <div className="container mx-auto w-full px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <img
  src="/images/logo.png"
  alt="Abdul Subhan Logo"
  className="w-10 h-10 object-contain rounded-xl"
/>
              <span className="font-bold text-white">Abdul Subhan</span>
            </div>
            <p className="text-gray-500 text-sm">Graphics Designer & Programmer</p>
            <p className="text-purple-400/60 text-xs mt-1">Creative Designs + Smart Web Solutions</p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: <FaWhatsapp />, href: "https://wa.me/923701609255" },
              { icon: <FiMail />, href: "mailto:abdulsubhan.design@gmail.com" },
              { icon: <FiGithub />, href: "https://github.com/abdulsubhan-dev" },
              { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/abdul-subhan-71014840b" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.15)" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">© 2026 Abdul Subhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState(
    window.location.hash === "#university-admission-designs" ? "university-admission" : "home"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash === "#university-admission-designs" ? "university-admission" : "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const backToPortfolio = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setCurrentPage("home");
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#060610", fontFamily: "'Inter', sans-serif" }}>
      <Particles />
      {/* Animated background gradient */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(168,85,247,0.06) 0%, transparent 60%)"
      }} />
      <div className="relative z-10">
        <Navbar />
        {currentPage === "university-admission" ? (
          <UniversityAdmissionDesignsPage onBack={backToPortfolio} />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Contact />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}
