
import { useState } from 'react'
import './App.css'
import { supabase } from './supabase'

const projects = [
  {
    title: 'Bright Future Coaching Classes',
    category: 'Web Development',
    description: 'A responsive coaching institute website with an enquiry form.',
    tech: 'HTML • CSS • JavaScript • Supabase',
    link: 'https://kerurkargayatri.github.io/coaching-classes-website/'
  },
  {
    title: 'JobSkills – Find Your Future',
    category: 'Web Application',
    description: 'A platform focused on skills, learning and career opportunities.',
    tech: 'HTML • CSS • JavaScript',
    link: 'https://kerurkargayatri.github.io/jobskills-app/'
  },
  {
    title: 'E-commerce Customer Intelligence',
    category: 'Data Analytics',
    description: 'An e-commerce project focused on customer intelligence and insights.',
    tech: 'Python • Data Analysis • Machine Learning',
    link: 'https://github.com/kerurkargayatri/ecommerce-customer-intelligence'
  }
]

const skills = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js',
  'Supabase', 'Responsive Design', 'Manual Testing',
  'Test Case Writing', 'Bug Reporting'
]

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([form])

      if (error) throw error

      setStatus('Thank you! Your message has been submitted.')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="website">

      <header className="navbar">
        <a href="#home" className="logo">NextGen<span>IT.</span></a>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-btn">Let's Talk ↗</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO NEXTGEN IT</p>

            <h1>
              Building Digital
              <span> Experiences.</span>
            </h1>

            <p className="hero-description">
              We create modern websites, digital solutions and
              quality-focused software experiences.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">
                Explore Projects ↗
              </a>

              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Gayatri_Kerurkar_Resume.pdf"
                className="secondary-btn"
              >
                ↓ Download Resume
              </a>
            </div>

            <div className="hero-note">
              <span className="online-dot"></span>
              Web Development • Software Testing • Digital Solutions
            </div>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>✦</span>
              <span>MY DIGITAL SPACE</span>
            </div>
            <div className="code-window">
              <p className="code-muted">// Welcome to NextGen IT</p>
              <p><span className="code-purple">const</span> agency = {'{'}</p>
              <p className="indent">name: <span className="code-green">'NextGen IT'</span>,</p>
              <p className="indent">focus: <span className="code-green">'Innovation'</span>,</p>
              <p className="indent">quality: <span className="code-green">'Always'</span></p>
              <p>{'}'}</p>
              <p className="code-bottom">Let's build something great. <span>▌</span></p>
            </div>
            <div className="card-footer">
              <span>CREATIVE THINKING</span>
              <span>01 / 04</span>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-label">01 — ABOUT</div>
          <div className="about-grid">
            <h2>Technology with a <span>purpose.</span></h2>
            <div>
              <p>
                NextGen IT is a growing digital initiative focused on
                website development, software testing and practical
                digital solutions.
              </p>
              <p>
                Founded by Gayatri Suresh Kerurkar, a BCA Final Year
                student passionate about technology, web development
                and software quality.
              </p>
              <a href="#contact" className="text-link">Let's work together ↗</a>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-label">02 — EXPERTISE</div>
          <h2 className="section-heading">Skills & <span>Technologies</span></h2>
          <p className="section-subtitle">
            Tools and technologies I have worked with.
          </p>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-card" key={skill}>
                <span>0{index + 1}</span>
                <h3>{skill}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-label">03 — WHAT I DO</div>
          <h2 className="section-heading">Services & <span>Solutions</span></h2>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon">⌘</div>
              <h3>Website Development</h3>
              <p>Responsive and modern websites designed for a better user experience.</p>
              <span>01 / DEVELOPMENT</span>
            </article>

            <article className="service-card">
              <div className="service-icon">⌕</div>
              <h3>Software Testing</h3>
              <p>Manual testing, test case preparation and bug reporting practice.</p>
              <span>02 / QUALITY</span>
            </article>

            <article className="service-card">
              <div className="service-icon">✳</div>
              <h3>Digital Solutions</h3>
              <p>Simple digital experiences that help solve practical problems.</p>
              <span>03 / INNOVATION</span>
            </article>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-label">04 — PORTFOLIO</div>
          <h2 className="section-heading">Selected <span>Projects</span></h2>
          <p className="section-subtitle">
            A selection of projects I have worked on.
          </p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">PROJECT / 0{index + 1}</div>
                <div className="project-symbol">✳</div>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">{project.tech}</div>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Project ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section testing-section" id="testing">
          <div className="section-label">05 — QUALITY ASSURANCE</div>
          <h2 className="section-heading">Manual Testing <span>Practice</span></h2>

          <div className="testing-grid">
            <div>
              <h3>Testing with attention to detail.</h3>
              <p>
                Learning and practicing software testing concepts
                through test scenarios, test cases and bug reports.
              </p>
            </div>

            <div className="testing-list">
              <p><span>✓</span> Test Case Writing</p>
              <p><span>✓</span> Functional Testing</p>
              <p><span>✓</span> UI Testing</p>
              <p><span>✓</span> Bug Reporting</p>
              <p><span>✓</span> Website Testing</p>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-label">06 — GET IN TOUCH</div>
          <div className="contact-grid">
            <div>
              <h2>Have a project in <span>mind?</span></h2>
              <p>Let's connect and discuss ideas, opportunities and collaborations.</p>

              <div className="contact-details">
                <p>EMAIL</p>
                <a href="mailto:gayatrikerurkar2708@gmail.com">
                  gayatrikerurkar2708@gmail.com
                </a>
                <p>GITHUB</p>
                <a href="https://github.com/kerurkargayatri" target="_blank" rel="noreferrer">
                  github.com/kerurkargayatri ↗
                </a>
                <p>LINKEDIN</p>
                <a href="https://www.linkedin.com/in/gayatri-kerurkar-b102b1321/" target="_blank" rel="noreferrer">
                  LinkedIn Profile ↗
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label>Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows="5"
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message ↗'}
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">NextGen<span>IT.</span></a>
        <p>Designed & developed by Gayatri Suresh Kerurkar.</p>
        <p>© {new Date().getFullYear()} NextGen IT. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App
