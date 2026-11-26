
import { useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

const services = [
  { icon: "⌘", title: "Website Development", desc: "Modern, responsive websites for your business." },
  { icon: "✓", title: "Software Testing", desc: "Quality-focused testing for reliable software." },
  { icon: "▣", title: "Ecommerce & Retail", desc: "Digital shopping experiences for growing brands." },
  { icon: "▤", title: "CRM & ERP Solutions", desc: "Organize workflows and business operations." },
  { icon: "✦", title: "AI & Machine Learning", desc: "Explore intelligent and data-driven solutions." },
  { icon: "◈", title: "Digital Solutions", desc: "Practical technology for everyday business needs." },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setStatus("");

    if (form.name.trim().length < 2) {
      setStatus("Please enter your full name.");
      return;
    }

    if (form.message.trim().length < 10) {
      setStatus("Please enter a message with at least 10 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          budget: form.budget,
          message: form.message.trim(),
        },
      ]);

      if (error) throw error;

      setStatus("Thank you! Your enquiry has been submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      console.error("Enquiry submission error:", error);
      setStatus(
        error.message || "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="website">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">N</span>
          <span>
            <strong>NextGen <b>IT</b></strong>
            <small>Building Digital. Enabling Growth.</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="admin-link" href="/admin">Admin Login ↗</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO NEXTGEN IT</span>
          <h1>
            Building Digital.
            <br />
            Enabling <span>Growth.</span>
          </h1>
          <p>
            We provide website development, software testing and digital
            solutions to help businesses build and grow their digital presence.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Get Started <span>→</span></a>
            <a href="#services" className="btn-secondary">Explore Services</a>
          </div>

          <div className="hero-note">
            <span className="note-dot"></span>
            Technology • Innovation • Growth
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow-circle"></div>
          <div className="tech-window">
            <div className="window-dots"><i></i><i></i><i></i></div>
            <div className="window-symbol">N<span>↗</span></div>
            <h2>NextGen <b>IT</b></h2>
            <p>INNOVATE · BUILD · GROW</p>
            <div className="code-lines">
              <i></i><i></i><i></i><i></i>
            </div>
          </div>
          <div className="floating-chip chip-one">⌘ Web Development</div>
          <div className="floating-chip chip-two">✓ Software Testing</div>
          <div className="floating-chip chip-three">✦ Digital Solutions</div>
        </div>
      </section>

      <section className="stats-strip">
        <div><strong>01</strong><span>Innovation First</span></div>
        <div><strong>02</strong><span>Quality Focus</span></div>
        <div><strong>03</strong><span>Customer Centric</span></div>
        <div><strong>04</strong><span>Growth Mindset</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE DO</span>
          <h2>Our <span>Services</span></h2>
          <p>Technology services designed around your digital goals.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-top">
                <span className="service-icon">{service.icon}</span>
                <span className="service-number">0{index + 1}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#contact">Discuss your project <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="about-visual">
          <div className="about-orbit">
            <div className="about-logo">N<span>↗</span></div>
            <strong>NextGen IT</strong>
            <small>BUILDING DIGITAL FUTURES</small>
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow">ABOUT NEXTGEN IT</span>
          <h2>Ideas into <span>Digital Possibilities.</span></h2>
          <p>
            NextGen IT is an emerging technology initiative focused on
            website development, software testing and practical digital
            solutions.
          </p>
          <p>
            Our goal is to understand real business needs and create useful,
            reliable and accessible digital experiences.
          </p>
          <a href="#contact" className="text-link">Let's work together →</a>
        </div>
      </section>

      <section className="why-section section">
        <div className="section-heading">
          <span className="eyebrow">OUR APPROACH</span>
          <h2>Why Choose <span>NextGen IT?</span></h2>
        </div>
        <div className="why-grid">
          <div><span>✦</span><h3>Innovation</h3><p>We explore modern approaches to digital challenges.</p></div>
          <div><span>✓</span><h3>Quality Focus</h3><p>We value careful work and dependable solutions.</p></div>
          <div><span>◎</span><h3>Client-Centric</h3><p>We start by understanding your requirements.</p></div>
          <div><span>↗</span><h3>Growth Mindset</h3><p>We aim to build solutions that can grow with you.</p></div>
        </div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="contact-copy">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>Let's Build Something <span>Great Together.</span></h2>
          <p>
            Have a project idea or need a digital solution? Tell us about it.
            We would be happy to hear from you.
          </p>
          <div className="contact-point"><span>✉</span> Share your project requirements</div>
          <div className="contact-point"><span>◈</span> Discuss a suitable solution</div>
          <div className="contact-point"><span>↗</span> Take your next digital step</div>
        </div>

        <form className="enquiry-form" onSubmit={submitEnquiry}>
          <h3>Send an Enquiry</h3>
          <p>Fill in the details and we'll get back to you.</p>

          <div className="form-row">
            <label>
              Full Name *
              <input name="name" value={form.name} onChange={updateForm} placeholder="Your full name" required />
            </label>
            <label>
              Email Address *
              <input type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required />
            </label>
          </div>

          <div className="form-row">
            <label>
              Mobile Number
              <input name="phone" value={form.phone} onChange={updateForm} placeholder="Your phone number" />
            </label>
            <label>
              Service Required *
              <select name="service" value={form.service} onChange={updateForm} required>
                <option value="">Select a service</option>
                {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <label>
            Estimated Budget
            <select name="budget" value={form.budget} onChange={updateForm}>
              <option value="">Select budget (optional)</option>
              <option value="Under ₹5,000">Under ₹5,000</option>
              <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
              <option value="₹15,000 – ₹50,000">₹15,000 – ₹50,000</option>
              <option value="₹50,000+">₹50,000+</option>
              <option value="Not decided">Not decided</option>
            </select>
          </label>

          <label>
            Tell us about your project *
            <textarea name="message" value={form.message} onChange={updateForm} placeholder="Describe your requirements..." rows="4" required minLength="10"></textarea>
          </label>

          <button className="submit-btn" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Enquiry →"}
          </button>

          {status && <div className="form-status" role="status">{status}</div>}
          <small className="privacy-note">Your information will only be used to respond to your enquiry.</small>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon">N</span>
            <span><strong>NextGen <b>IT</b></strong><small>Building Digital. Enabling Growth.</small></span>
          </a>
          <p>Innovate. Build. Grow.</p>
          <a className="footer-contact" href="#contact">Start a Conversation →</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NextGen IT. All rights reserved.</span>
          <a href="/admin">Admin Login</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
