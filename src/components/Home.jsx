import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { MapPin, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import coreImg from '../assets/images/Core.jpg';
import '../assets/css/Home.css';

/* ─────────────────────────────────────────
   3D PARTICLE FIELD
───────────────────────────────────────── */
function Particles({ count = 3000, color = '#c0392b', speed = 0.04 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 28;
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * speed * 0.6;
      ref.current.rotation.y -= delta * speed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.045} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function Background3D() {
  return (
    <div className="canvas-bg">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 65 }}>
        <Particles count={2200} color="#c0392b" speed={0.03} />
        <Particles count={900}  color="#ff4500" speed={0.05} />
      </Canvas>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO IMAGE
───────────────────────────────────────── */
function HeroImage() {
  return (
    <motion.div
      className="hero-img-wrap"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={coreImg} alt="hero" className="hero-img" />
      <div className="hero-img-glow" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PARALLAX HOOK
───────────────────────────────────────── */
function useParallax(ref, outputRange) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return useTransform(scrollYProgress, [0, 1], outputRange);
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const techStack = [
  { name: 'React',       color: '#61dafb', level: 90 },
  { name: 'JavaScript',  color: '#3178c6', level: 80 },
  { name: 'Node.js',     color: '#68a063', level: 80 },
  { name: 'Java',        color: '#f89820', level: 70 },
  { name: 'Spring Boot', color: '#6db33f', level: 70 },
  { name: 'Confluent Kafka',      color: '#ffd43b', level: 70 },
  { name: 'AWS',         color: '#ff9900', level: 50 },
  { name: 'Docker',      color: '#2496ed', level: 50 },
  { name: 'Cassandra, AstraDB',     color: '#47a248', level: 75 },
  { name: 'PostgreSQL',  color: '#336791', level: 70 },
  { name: 'Neo4j',     color: '#e10098', level: 60 },
  { name: 'Full-Stack',       color: '#c0392b', level: 80 },
];

const education = [
  {
    degree: 'B.E. — Computer Science',
    school: 'Sri Krishna Institute of Technology',
    year: '2021 – 2025',
    grade: 'CGPA 7.3',
    desc: 'Final Project - Inter Dept Communication Portal',
  },
  {
    degree: 'Higher Secondary (XII)',
    school: 'Hymamshu Composite PU College',
    year: '2019 – 2021',
    grade: '71%',
    desc: 'PCMB',
  },
  {
    degree: 'Secondary (X)',
    school: 'Kanva Public School',
    year: '2019',
    grade: '76%',
    desc: 'Science',
  },
];

/* ─────────────────────────────────────────
   GLOW ORBS
───────────────────────────────────────── */
function GlowOrbs() {
  return (
    <div className="glow-orbs" aria-hidden>
      <div className="orb orb-red1" />
      <div className="orb orb-red2" />
      <div className="orb orb-dark" />
    </div>
  );
}

/* ─────────────────────────────────────────
   HOME
───────────────────────────────────────── */
export default function Home() {
  const heroRef   = useRef(null);
  const skillsRef = useRef(null);
  const eduRef    = useRef(null);

  const heroY   = useParallax(heroRef,   ['-12%', '12%']);
  const skillsY = useParallax(skillsRef, ['-10%', '10%']);
  const eduY    = useParallax(eduRef,    ['-10%', '10%']);

  return (
    <div className="home-root">
      <Background3D />
      <GlowOrbs />

      {/* Navbar */}
      <nav className="home-nav">
        <span className="nav-logo">VY<span className="dot">.</span></span>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
        </div>
      </nav>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="section hero-section" ref={heroRef}>
        <motion.div className="section-parallax-layer" style={{ y: heroY }}>
          <div className="hero-glow-line" />
        </motion.div>

        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="status-dot" />
            Associate Engineer · Open to opportunities
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            VISHNU<br />
            <span className="title-glow">YADAV M N</span><br />
            <span className="title-sub"></span>
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            Building fast, accessible and beautifully crafted<br />
            web applications — from pixel-perfect UIs<br />
            to scalable backend systems.
          </motion.p>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span><MapPin size={13} /> Bengaluru, India</span>
            <span><Briefcase size={13} /> 1+ Years Experience</span>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <a href="#skills" className="btn-primary">Explore Skills</a>
            <div className="tooltip-container">
              <div className="tooltip">
                <div className="profile">
                  <div className="user">
                    <div className="img">VY</div>
                    <div className="details">
                      <div className="name">Vishnu Yadav M N</div>
                      <div className="username">@vishnuyadav</div>
                    </div>
                  </div>
                  <div className="about">200+ Connections</div>
                </div>
              </div>
              <div className="text">
                <a className="icon" href="https://www.linkedin.com/in/vishnu-yadav-m-n-818148232" target="_blank" rel="noreferrer">
                  <div className="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fab fa-linkedin">
                      <svg viewBox="0 0 448 512" height="1em">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    </span>
                  </div>
                  <div className="text">LinkedIn</div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <HeroImage />

        <div className="scroll-hint">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >↓</motion.span>
          <span>scroll</span>
        </div>
      </section>

      {/* ══ SECTION 2 — SKILLS ══ */}
      <section className="section skills-section" id="skills" ref={skillsRef}>
        <motion.div className="section-parallax-layer" style={{ y: skillsY }}>
          <div className="skills-glow-blob" />
        </motion.div>

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-sub">Tools I use to bring ideas to life.</p>
        </motion.div>

        <div className="skills-grid">
          {techStack.map(({ name, color, level }, i) => (
            <motion.div
              key={name}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.055, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="skill-top">
                <span className="skill-dot" style={{ background: color, boxShadow: `0 0 10px ${color}88` }} />
                <span className="skill-name">{name}</span>
                <span className="skill-pct">{level}%</span>
              </div>
              <div className="skill-bar-track">
                <motion.div
                  className="skill-bar-fill"
                  style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.04, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 3 — EDUCATION ══ */}
      <section className="section edu-section" id="education" ref={eduRef}>
        <motion.div className="section-parallax-layer" style={{ y: eduY }}>
          <div className="edu-glow-blob" />
        </motion.div>

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-sub">My academic journey and qualifications.</p>
        </motion.div>

        <div className="edu-timeline">
          {education.map(({ degree, school, year, grade, desc }, i) => (
            <motion.div
              key={degree}
              className="edu-card"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="edu-timeline-col">
                <div className="edu-icon-wrap">
                  <GraduationCap size={17} />
                </div>
                {i < education.length - 1 && <div className="edu-line" />}
              </div>
              <div className="edu-body">
                <div className="edu-head">
                  <h3 className="edu-degree">{degree}</h3>
                  <span className="edu-grade">{grade}</span>
                </div>
                <p className="edu-school">{school}</p>
                <p className="edu-year"><Calendar size={11} /> {year}</p>
                <p className="edu-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        © 2025 Vishnu Yadav M N · React + Framer Motion
      </footer>
    </div>
  );
}
