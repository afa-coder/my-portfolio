import profileImg from './assets/1a.jpg';
import resumePDF from './assets/resume.pdf';
import { useState, useEffect } from 'react';
import { 
  Terminal, Code2, Database, Cloud, User, 
  Mail, MapPin, Phone, ExternalLink, 
  X, Download, Send, CheckCircle, AlertCircle 
} from 'lucide-react';

// --- DATA ---

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const SKILLS = [
  { category: "Frontend", icon: <Code2 size={20} />, items: ["HTML/CSS/JS", "React", "Vite", "Next.js"] },
  { category: "Backend", icon: <Terminal size={20} />, items: ["Node.js", "Express.js"] },
  { category: "Programming", icon: <Code2 size={20} />, items: ["C", "C++", "Python"] },
  { category: "DevOps & Cloud", icon: <Cloud size={20} />, items: ["Deployment", "Hosting", "Azure Basics", "CI/CD"] },
  { category: "Database", icon: <Database size={20} />, items: ["SQL", "NoSQL", "MongoDB", "PostgreSQL"] },
  { category: "Soft Skills", icon: <User size={20} />, items: ["Leadership", "Communication", "Critical Thinking"] },
];

const PROJECTS = [
  {
    id: 1,
    title: "AI Underwater Image Enhancer",
    shortDesc: "Deep learning model to restore color and clarity to underwater imagery.",
    fullDesc: "Developed an advanced AI pipeline utilizing CNNs to correct color distortion and backscatter in underwater images. Deployed as a microservice API for real-time processing.",
    role: "AI / Backend Developer",
    tech: ["Python", "TensorFlow", "Flask", "OpenCV"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "Cloud Infrastructure Deployment",
    shortDesc: "Automated scalable cloud architecture using Infrastructure as Code.",
    fullDesc: "Designed and deployed a highly available cloud architecture on Azure. Configured load balancers, auto-scaling groups, and secure virtual networks using Terraform and GitHub Actions.",
    role: "DevOps Engineer",
    tech: ["Azure", "Terraform", "Docker", "GitHub Actions"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "University Management System",
    shortDesc: "Comprehensive portal for academic administration and student tracking.",
    fullDesc: "Built a robust monolithic backend serving a decoupled React frontend to manage course registrations, grading, and faculty scheduling. Implemented role-based access control (RBAC).",
    role: "Full-Stack Developer",
    tech: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "Real-time Chatting Application",
    shortDesc: "Low-latency messaging app with persistent chat history and presence indicators.",
    fullDesc: "Engineered a WebSocket-based messaging platform supporting group chats, media sharing, and read receipts. Optimized database queries to handle high-throughput message persistence.",
    role: "Backend / WebSockets Developer",
    tech: ["Next.js", "Socket.io", "Redis", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 5,
    title: "E-Commerce Deployment Pipeline",
    shortDesc: "Containerized e-commerce platform with automated zero-downtime deployments.",
    fullDesc: "Dockerized a legacy e-commerce application and established a robust CI/CD pipeline. Reduced deployment times by 40% and ensured 99.9% uptime during rolling updates.",
    role: "DevOps / Cloud Engineer",
    tech: ["Docker", "Jenkins", "Nginx", "Linux"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 6,
    title: "Online Job Portal System",
    shortDesc: "Platform connecting job seekers with tech companies, featuring AI resume parsing.",
    fullDesc: "Developed a full-stack job board where employers can post listings and candidates can apply. Integrated an external NLP API to automatically extract skills from uploaded PDFs.",
    role: "Full-Stack Developer",
    tech: ["React", "Node.js", "Tailwind", "REST APIs"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 7,
    title: "Inventory Management System",
    shortDesc: "SaaS dashboard for tracking stock levels and supply chain logistics.",
    fullDesc: "Created a modern dashboard with real-time analytics, predictive restock alerts, and barcode scanning integration. Focused heavily on client-side performance and responsive UI.",
    role: "Frontend Lead",
    tech: ["React", "Vite", "Zustand", "Chart.js"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 8,
    title: "School Management System",
    shortDesc: "Digital infrastructure for primary and secondary school operations.",
    fullDesc: "Architected a multi-tenant system for schools to manage attendance, fees, and parent-teacher communications. Built with strict data isolation and secure payment gateways.",
    role: "System Architect",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

// --- COMPONENTS ---

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)] relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-cyan-400 font-medium mb-6">Role: {project.role}</p>
        
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-slate-300 leading-relaxed">{project.fullDesc}</p>
        </div>
        
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
            <Github size={18} /> Source Code
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <ExternalLink size={18} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    formData.append("access_key", "70e63761-ff50-4222-bf04-3e9135611c86");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        console.error("Error submitting form", data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Network error", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-md" method='post'>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
        <input name="name" required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Enter your name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
        <input name="email" required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Your Email" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
        <textarea name="message" required rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none" placeholder="Drop your message here..."></textarea>
      </div>
      <button 
        disabled={status === 'loading' || status === 'success'}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg transition-all font-medium shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        {status === 'idle' && <><Send size={18} /> Send Message</>}
        {status === 'loading' && <span className="animate-pulse">Sending...</span>}
        {status === 'success' && <><CheckCircle size={18} /> Sent Successfully</>}
        {status === 'error' && <><AlertCircle size={18} /> Error Sending</>}
      </button>
    </form>
  );
};

// --- MAIN PAGE ---

export default function Portfolio() {

  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);


  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
{/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center pt-20 pb-12">
          
          {/* Main Container: Removed justify-between, aligned to start, controlled gap */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-start gap-12 md:gap-16 w-full">
            
            {/* LEFT SIDE: Text Content (Added max-w-2xl instead of flex-1 to pull image closer) */}
            <div className="w-full max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium w-fit mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Available for opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
                Awais Farhan Alam
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-400 font-light mb-8 mx-auto md:mx-0">
                Software Engineer | <span className="text-white font-medium">Full-Stack Developer</span> | DevOps Enthusiast
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed mx-auto md:mx-0">
                Building scalable web applications, automated cloud systems, and AI-driven solutions to solve real-world problems.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#projects" className="px-8 py-3 bg-white text-slate-950 font-semibold rounded-lg hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  View Projects
                </a>
                <a href="#contact" className="px-8 py-3 bg-slate-900 border border-slate-700 text-white font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all">
                  Contact Me
                </a>
              </div>
            </div>

            {/* RIGHT SIDE: Profile Image */}
            <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative group">
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500"></div>
              
              {/* Image using the Vite import variable */}
              <img 
                src={profileImg} 
                alt="Awais Farhan Alam" 
                className="relative w-full h-full object-cover rounded-full border-2 border-slate-800 group-hover:border-cyan-400 shadow-2xl transition-all duration-300"
              />
            </div>
            
          </div>
        </section>

        {/* ABOUT & RESUME SECTION */}
        <section id="about" className="py-20 border-t border-slate-800/50">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Professional Focus</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Full-Stack Web Development</li>
                      <li>• System Architecture Design</li>
                      <li>• DevOps & CI/CD Practices</li>
                      <li>• Aspiring Technical Leader</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Core Objectives</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Building highly scalable applications</li>
                      <li>• Optimizing cloud deployments</li>
                      <li>• Real-world problem solving</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
           {/* RESUME CARD */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 border border-cyan-500/20">
                <Code2 className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Resume</h3>
              <p className="text-slate-400 mb-6 text-sm">Download or view my comprehensive CV for a detailed look at my technical background.</p>
              
              {/* Button Container */}
              <div className="flex w-full gap-3">
                {/* View Button - Opens in new tab */}
                <a 
                  href={resumePDF} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-slate-800 border border-slate-600 hover:border-cyan-500 hover:text-cyan-400 text-white rounded-lg transition-all font-medium text-sm md:text-base cursor-pointer"
                >
                  <ExternalLink size={18} /> View
                </a>
                
                {/* Download Button - Forces download */}
                <a 
                  href={resumePDF} 
                  download="Awais_Farhan_Alam_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium text-sm md:text-base cursor-pointer"
                >
                  <Download size={18} /> Download
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-slate-800/50">
          <h2 className="text-3xl font-bold text-white mb-10">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill) => (
              <div key={skill.category} className="group p-6 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-slate-800/50">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
              <p className="text-slate-400">Production-level deployments and architectures.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <div key={project.id} className="flex flex-col bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors">
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && <span className="text-xs font-medium text-slate-500 px-2 py-1">+{project.tech.length - 3} more</span>}
                  </div>
                </div>
                <div className="p-4 border-t border-slate-800/50 bg-slate-900/50 flex gap-3">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                  >
                    View Details
                  </button>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-2 text-sm font-medium bg-cyan-600/10 hover:bg-cyan-600 hover:text-white text-cyan-400 flex items-center justify-center gap-2 rounded-lg transition-colors border border-cyan-500/20"
                  >
                    Preview <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-slate-800/50 mb-20">
          <h2 className="text-3xl font-bold text-white mb-10">Let's Connect</h2>
          <div className="grid md:grid-cols-2 gap-12">
            
            <div>
              <p className="text-slate-400 mb-8 text-lg">
                I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you soon!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">awaisfarhan21@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">+92 341 0570561</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium">Islamabad, Pakistan (Open to Remote)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a href="https://github.com/afa-coder" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/awais-farhan-alam-979b39293/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* FORM COMPONENT */}
            <ContactForm />
            
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Awais Farhan Alam All rights are reserved</p>
      </footer>

      {/* MODAL PORTAL */}
      <ProjectModal 
        isOpen={!!selectedProject} 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
    </div>
  );
}