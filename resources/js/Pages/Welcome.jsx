import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Github, Linkedin, Mail, Download, 
    Music, Book, Tent, Cpu, Globe, 
    Code2, Database, Terminal, Sun, Moon, ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaPhp, FaLaravel, FaReact, FaJs, FaPython, FaDatabase, FaNodeJs, FaHtml5, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiTailwindcss, SiTypescript, SiPostgresql, SiNextdotjs } from 'react-icons/si';

// Componente para el efecto de revelado al hacer scroll
const Reveal = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export default function Welcome({ listaProyectos = [], auth }) {
    const [tema, setTema] = useState('dark');
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    // ESTADO PARA LA FOTO
    const [fotoIndex, setFotoIndex] = useState(0);
    const misFotos = [
        "https://i.postimg.cc/cJpKs0kF/Copilot-20260108-124622.png",
        "https://i.postimg.cc/fbmzfX5t/Copilot-20260108-124625.png"
    ];

    // Lógica para seguir el mouse
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (localStorage.theme === 'light') {
            document.documentElement.classList.remove('dark');
            setTema('light');
        } else {
            document.documentElement.classList.add('dark');
            setTema('dark');
        }
    }, []);

    const toggleTema = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            const nuevoTema = tema === 'dark' ? 'light' : 'dark';
            setTema(nuevoTema);
            if (nuevoTema === 'light') {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
            setIsAnimating(false);
        }, 500);
    };

    const miStack = [
        { nombre: 'PHP', icono: <FaPhp />, color: 'text-indigo-400' },
        { nombre: 'Laravel', icono: <FaLaravel />, color: 'text-red-500' },
        { nombre: 'React', icono: <FaReact />, color: 'text-blue-400' },
        { nombre: 'JavaScript', icono: <FaJs />, color: 'text-yellow-400' },
        { nombre: 'Python', icono: <FaPython />, color: 'text-blue-500' },
        { nombre: 'MySQL', icono: <SiMysql />, color: 'text-blue-600' },
        { nombre: 'MongoDB', icono: <SiMongodb />, color: 'text-green-500' },
        { nombre: 'Tailwind', icono: <SiTailwindcss />, color: 'text-cyan-400' },
        { nombre: 'TypeScript', icono: <SiTypescript />, color: 'text-blue-500' },
        { nombre: 'Docker', icono: <FaDocker />, color: 'text-blue-400' },
    ];

    const proyectosFinales = listaProyectos;

    return (
        <>
            <Head title="Alexis Tobar | Analista Programador Full-Stack" />
            
            {/* CURSOR PERSONALIZADO */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block"
                animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
                transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.5 }}
            />

            <AnimatePresence>
                {isAnimating && (
                    <motion.div 
                        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-zinc-200 dark:bg-zinc-800 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-zinc-50 dark:bg-[#050508] text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-500">
                
                <nav className="fixed top-0 w-full z-50 flex justify-center p-4 md:p-6">
                    <div className="bg-white/70 dark:bg-[#0f111a]/80 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-full px-4 md:px-6 py-2 flex items-center gap-4 md:gap-8 shadow-2xl">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-black text-[10px] text-white">AT</div>
                            <span className="text-xs md:text-sm font-bold tracking-tight hidden sm:block italic uppercase">Alexis Tobar</span>
                        </div>
                        <div className="flex gap-4 md:gap-6 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            <a href="#inicio" className="hover:text-blue-500 transition-colors italic">Inicio</a>
                            <a href="#proyectos" className="hover:text-blue-500 transition-colors italic">Proyectos</a>
                            <a href="#sobre-mi" className="hover:text-blue-500 transition-colors italic">Sobre mí</a>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={toggleTema}
                            className="p-2 rounded-full bg-zinc-200 dark:bg-white/10 text-zinc-800 dark:text-yellow-400 transition-all border border-black/5 dark:border-white/10"
                        >
                            {tema === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                    </div>
                </nav>

                <header id="inicio" className="relative pt-32 md:pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    <div className="flex-1 space-y-6 md:space-y-10 text-center md:text-left order-2 md:order-1">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-blue-600 dark:text-blue-500 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase italic">▹ Bienvenido a mi portafolio profesional</motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight tracking-tighter italic uppercase">Alexis <br /> <span className="text-blue-600 dark:text-blue-400">Tobar</span></motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-xl text-zinc-600 dark:text-zinc-400 text-base md:text-lg italic">
                            Arquitecto Full-Stack especializado en soluciones robustas con <span className="text-zinc-900 dark:text-white font-bold">Laravel & React</span>.
                        </motion.p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="#proyectos" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-transform italic text-center">Mis Trabajos</a>
                            <Link href={route('login')} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all text-center italic text-zinc-800 dark:text-zinc-100">
                                Panel Admin
                            </Link>
                        </div>
                    </div>

                    {/* IMAGEN DE PERFIL FLOTANTE CON EFECTO HOVER */}
                    <div className="flex-1 relative order-1 md:order-2 w-full max-w-[400px] md:max-w-none flex justify-center items-center">
                        {/* Aura de fondo */}
                        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
                        
                        <div 
                            className="relative w-full aspect-square flex justify-center items-center cursor-crosshair"
                            onMouseEnter={() => setFotoIndex(1)}
                            onMouseLeave={() => setFotoIndex(0)}
                        >
                            <AnimatePresence mode='wait'>
                                <motion.img 
                                    key={fotoIndex}
                                    src={misFotos[fotoIndex]} 
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1.1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                    transition={{ duration: 0.4, ease: "backOut" }}
                                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.4)]" 
                                    alt="Alexis Tobar" 
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <Reveal>
                    <section id="sobre-mi" className="py-20 md:py-32 px-6 max-w-5xl mx-auto text-center space-y-12">
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white italic">Sobre Mí</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl leading-relaxed italic max-w-3xl mx-auto">
                            Analista Programador apasionado por el desarrollo de software nativo en la nube. Me especializo en ingeniería de software moderna e interfaces intuitivas.
                        </p>
                    </section>
                </Reveal>

                {/* SECCIÓN PROYECTOS */}
                <section id="proyectos" className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-4 tracking-tighter text-zinc-900 dark:text-white italic">Proyectos Destacados</h2>
                            <p className="text-zinc-500 italic uppercase tracking-widest text-[10px]">Trabajos reales desde la base de datos</p>
                        </div>
                    </Reveal>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {proyectosFinales.length > 0 ? (
                            proyectosFinales.map((pro, i) => (
                                <Reveal key={pro.id || i}>
                                    <motion.div 
                                        whileHover={{ y: -10 }} 
                                        className="bg-white dark:bg-[#0f111a] border border-black/5 dark:border-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-8 group shadow-sm"
                                    >
                                        <div className="aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-6 md:mb-8 border border-black/5 dark:border-white/5 flex items-center justify-center">
                                            <motion.img 
                                                whileHover={{ scale: 1.05 }}
                                                src={pro.imagen_url} 
                                                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" 
                                                alt={pro.titulo} 
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-3 block italic">{pro.tecnologias}</span>
                                        <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-4 group-hover:text-blue-500 transition-colors italic leading-tight">{pro.titulo}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 md:mb-8 italic">{pro.descripcion}</p>
                                        
                                        <div className="flex flex-wrap gap-6 border-t border-black/5 dark:border-white/10 pt-6">
                                            {pro.link_proyecto && (
                                                <a href={pro.link_proyecto} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform italic">
                                                    Ver Proyecto <ExternalLink size={14} />
                                                </a>
                                            )}
                                            {pro.link_github && (
                                                <a href={pro.link_github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-transform italic">
                                                    <Github size={14} /> GitHub
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </Reveal>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-zinc-400 italic uppercase tracking-widest text-sm">No hay proyectos publicados aún.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* STACK */}
                <Reveal>
                    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-20">
                            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-4 italic">Stack Tecnológico</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                            {miStack.map((t, i) => (
                                <div key={i} className="bg-white dark:bg-[#0f111a] border border-black/5 dark:border-white/5 p-8 md:p-10 rounded-[2rem] flex flex-col items-center gap-4 group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border-b-2 border-b-transparent hover:border-b-blue-600 shadow-sm">
                                    <div className={`text-4xl md:text-5xl ${t.color} group-hover:scale-110 transition-transform`}>{t.icono}</div>
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors italic">{t.nombre}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                <footer className="py-12 md:py-20 border-t border-black/5 dark:border-white/5 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase italic">Alexis Tobar</h2>
                        <p className="text-zinc-400 text-[9px] font-black tracking-[0.4em] uppercase italic">Analista Programador — Chile 2026</p>
                    </div>
                    <div className="flex gap-8 md:gap-10 text-zinc-400">
                        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><Github size={20} /></a>
                        <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
                        <a href="mailto:alexis@example.cl" className="hover:text-red-500 transition-colors"><Mail size={20} /></a>
                    </div>
                </footer>
            </div>
        </>
    );
}

function ArrowUpRight({size, className}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>;
}