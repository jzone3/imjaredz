import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-2xl font-bold mb-1">devin_maxxer</h1>
          <p className="text-zinc-500">Senior Fullstack Software Engineer</p>
        </header>

        {/* About */}
        <section className="mb-14">
          <p className="leading-relaxed text-zinc-700">
            I'm Jared. I build software for people — web apps, automations, scrapers, bug fixes, whatever you need.
            I've shipped production code at Facebook, Google, Tecton, and PromptLayer, and studied EECS at UC Berkeley.
          </p>
          <p className="leading-relaxed text-zinc-700 mt-4">
            Fast turnaround. Most jobs delivered in 1–3 days.
          </p>
        </section>

        {/* What I Do */}
        <section className="mb-14">
          <h2 className="text-lg font-semibold mb-4">What I do</h2>
          <ul className="space-y-2 text-zinc-700">
            <li>Web scraping &amp; data extraction</li>
            <li>Custom Python scripts &amp; automation</li>
            <li>Bug fixes &amp; debugging</li>
            <li>Full-stack web development (React, Node, Python)</li>
            <li>API integrations &amp; backend services</li>
            <li>CI/CD &amp; infrastructure</li>
          </ul>
        </section>

        {/* Work Examples */}
        <section className="mb-14">
          <h2 className="text-lg font-semibold mb-4">Some things I've built</h2>
          <ul className="space-y-4 text-zinc-700">
            <li>
              <span className="font-medium text-zinc-900">PromptLayer</span> — Co-founded a developer tools platform used by engineering teams to manage, version, and evaluate their software workflows. Raised funding, grew to thousands of users.
            </li>
            <li>
              <span className="font-medium text-zinc-900">Montalvo Analytics</span> — Built a data analytics platform for some of America's largest reform campaigns.
            </li>
            <li>
              <span className="font-medium text-zinc-900">Presidio Jeans</span> — Designed and built the e-commerce site for a denim brand manufactured in the USA.
            </li>
            <li>
              <span className="font-medium text-zinc-900">hackBCA</span> — Founded and organized the first-ever high school hackathon, hosting over 1,000 students. Built the website, registration system, and event infrastructure.
            </li>
            <li>
              <span className="font-medium text-zinc-900">ScreenShades</span> — Chrome extension that blocks TV spoilers on social media by monitoring your watch history. Top 20 at PennApps, won Best Hack in Media/Entertainment (Comcast).
            </li>
            <li>
              <span className="font-medium text-zinc-900">Learn to Drive</span> — In-car dashboard app for new drivers, built with the GM Dashboard SDK. Won 2nd place at TechCrunch Disrupt NYC Hackathon.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-14">
          <h2 className="text-lg font-semibold mb-4">Get in touch</h2>
          <p className="text-zinc-700 mb-4">
            Best way to reach me is through Fiverr.
          </p>
          <p>
            <a href="https://www.fiverr.com/devin_maxxer" target="_blank" rel="noopener noreferrer" className="underline text-zinc-700 hover:text-zinc-900">
              fiverr.com/devin_maxxer
            </a>
          </p>
        </section>

        {/* Links */}
        <footer className="pt-8 border-t border-zinc-200 text-sm text-zinc-500">
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/jaredzoneraich" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 underline">
              LinkedIn
            </a>
            <a href="https://www.fiverr.com/devin_maxxer" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 underline">
              Fiverr
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
