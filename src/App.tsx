import './App.css'
import { Code, Zap, Bot, Bug, ArrowRight, Mail, Github, Linkedin, ExternalLink, ChevronDown, Star } from 'lucide-react'

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Full-Stack Web Development',
    description: 'Modern web apps built with React, Next.js, TypeScript, Python, and more. From landing pages to complex platforms.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Automation & Scripting',
    description: 'Custom scripts, CI/CD pipelines, workflow automation, and integrations that save your team hours every week.',
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Integration',
    description: 'Add AI capabilities to your product — chatbots, content generation, data analysis, and LLM-powered features.',
  },
  {
    icon: <Bug className="w-8 h-8" />,
    title: 'Bug Fixes & Code Reviews',
    description: 'Fast turnaround on debugging, refactoring, dependency upgrades, and thorough code review.',
  },
]

const projects = [
  {
    title: 'E-Commerce Platform Migration',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    description: 'Migrated a legacy PHP storefront to a modern React + Node stack. Improved page load times by 60% and added real-time inventory sync.',
    image: '/images/web-dev.jpg',
  },
  {
    title: 'AI-Powered Support Bot',
    tags: ['Python', 'OpenAI', 'FastAPI'],
    description: 'Built a customer support chatbot using GPT-4 that reduced ticket volume by 40%. Integrated with Slack and Zendesk.',
    image: '/images/ai-integration.jpg',
  },
  {
    title: 'CI/CD Pipeline Overhaul',
    tags: ['GitHub Actions', 'Docker', 'AWS'],
    description: 'Redesigned deployment infrastructure for a SaaS startup. Cut deploy times from 45 min to under 5 min with zero-downtime releases.',
    image: '/images/automation.jpg',
  },
  {
    title: 'Codebase Modernization',
    tags: ['TypeScript', 'React', 'Testing'],
    description: 'Converted a 50k-line JavaScript codebase to TypeScript, added comprehensive test coverage, and set up automated linting.',
    image: '/images/code-review.jpg',
  },
]

const reviews = [
  {
    name: 'Alex M.',
    role: 'Startup Founder',
    text: 'Incredibly fast turnaround. Delivered a working MVP in 3 days that would have taken my team weeks. Will definitely hire again.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Product Manager',
    text: 'Great communication throughout the project. The code was clean, well-documented, and exactly what we needed.',
    stars: 5,
  },
  {
    name: 'David R.',
    role: 'CTO, Series A Startup',
    text: 'Fixed a critical production bug in under 2 hours. Jared clearly knows what he is doing. Highly recommended.',
    stars: 5,
  },
]

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">jz</span>dev
          </a>
          <div className="hidden sm:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-800/60 border border-zinc-700 rounded-full px-4 py-1.5 text-sm text-zinc-300 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Available for new projects
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
            I build software<br />
            <span className="text-emerald-400">fast & right.</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-stack developer with 10+ years of experience. I help startups and businesses
            ship features, fix bugs, and build products — powered by AI-accelerated development.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-8 py-3.5 rounded-xl text-lg transition-colors"
            >
              See My Work
            </a>
          </div>
        </div>
        <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">What I Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Services</h2>
          <p className="text-zinc-400 max-w-xl mb-16">
            Whether you need a full product built from scratch or a quick fix shipped by tomorrow,
            I've got you covered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="text-emerald-400 mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recent Work</h2>
          <p className="text-zinc-400 max-w-xl mb-16">
            A few examples of projects I've delivered for clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div
                key={p.title}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/1a1a2e/10b981?text=Project'
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Clients Say</h2>
          <p className="text-zinc-400 max-w-xl mb-16">
            Real feedback from real projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6">"{r.text}"</p>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-zinc-500 text-sm">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Build Something</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12">
            Have a project in mind? Send me a message and I'll get back to you within 24 hours.
          </p>
          <form
            className="max-w-lg mx-auto space-y-4 text-left"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const name = (form.elements.namedItem('name') as HTMLInputElement).value
              const email = (form.elements.namedItem('email') as HTMLInputElement).value
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
              const subject = encodeURIComponent(`Freelance Inquiry from ${name}`)
              const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
              window.location.href = `mailto:jared.zoneraich@gmail.com?subject=${subject}&body=${body}`
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={5}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-3.5 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" /> Send Message
            </button>
          </form>
          <div className="flex items-center justify-center gap-6 mt-10">
            <a
              href="https://github.com/jzone3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/jaredzoneraich"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.fiverr.com/devin_maxxer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm font-medium">Fiverr</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Jared Zoneraich. All rights reserved.</p>
          <p>Built with purpose. Shipped with speed.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
