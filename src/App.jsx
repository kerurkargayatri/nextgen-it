
import { useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const services = [
    "Website Development",
    "Ecommerce & Retail",
    "Mobile App Development",
    "CRM & ERP Solutions",
    "Software Testing",
    "AI & Machine Learning",
    "Data Analytics",
    "Cloud & DevOps",
    "Automation & Integrations",
    "Other",
  ];

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function submitEnquiry(e) {
    e.preventDefault();
    setSending(true);
    setStatus("");

    const { error } = await supabase.from("enquiries").insert([
      {
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: form.message,
      },
    ]);

    if (error) {
      setStatus("Enquiry failed: " + error.message);
    } else {
      setStatus("Thank you! Your enquiry has been submitted.");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
    }

    setSending(false);
  }

  return (
    <div className="website">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">N</span>
          <span>NextGen <b>IT</b></span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-cta">Get Started →</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YOUR DIGITAL GROWTH PARTNER</span>
            <h1>
              Building Digital
              <span> Solutions for</span>
              <span>Tomorrow.</span>
            </h1>
            <p>
              We aim to help businesses grow through modern websites,
              software solutions and technology-driven digital experiences.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">Start a Project →</a>
              <a href="#services" className="btn-secondary">Explore Services</a>
            </div>

            <p className="hero-note">Innovation • Technology • Growth</p>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>
            <div className="visual-core">NG</div>
            <div className="floating-card card-top">✦ Smart Solutions</div>
            <div className="floating-card card-bottom">✓ Digital Innovation</div>
          </div>
        </section>

        <section className="trust-strip">
          <span>Technology</span>
          <span>Innovation</span>
          <span>Digital Solutions</span>
          <span>Customer Focus</span>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="eyebrow">WHO WE ARE</span>
            <h2>Technology with a purpose.</h2>
          </div>
          <div className="about-grid">
            <p className="large-copy">
              NextGen IT is an emerging technology initiative focused on
              creating useful, accessible and modern digital solutions.
            </p>
            <div className="about-detail">
              <p>
                Our goal is to understand business challenges and explore
                practical technology solutions that make everyday work easier.
              </p>
              <a href="#contact" className="text-link">Let's work together →</a>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>Services designed for progress.</h2>
            <p>Technology services we aim to offer businesses and organisations.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service}>
                <span className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="service-symbol">✦</div>
                <h3>{service}</h3>
                <p>Explore a practical digital solution for your requirements.</p>
                <a href="#contact">Discuss your project →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="section-heading">
            <span className="eyebrow">HOW WE WORK</span>
            <h2>A clear path from idea to solution.</h2>
          </div>
          <div className="process-grid">
            {[
              "Understand your requirements",
              "Plan the solution",
              "Design the experience",
              "Develop the project",
              "Test and review",
              "Deliver the solution",
            ].map((step, index) => (
              <article className="process-card" key={step}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section principles-section">
          <div className="section-heading">
            <span className="eyebrow">OUR PRINCIPLES</span>
            <h2>Built around what matters.</h2>
          </div>
          <div className="principles-grid">
            <article><h3>01. Simplicity</h3><p>Making technology easier to understand and use.</p></article>
            <article><h3>02. Quality</h3><p>Giving attention to details, reliability and testing.</p></article>
            <article><h3>03. Innovation</h3><p>Exploring useful ideas and modern approaches.</p></article>
          </div>
        </section>

        <section className="section enquiry-section" id="contact">
          <div className="enquiry-copy">
            <span className="eyebrow">LET'S CONNECT</span>
            <h2>Have a project in mind?</h2>
            <p>Tell us about your requirements. We will review your enquiry.</p>
            <div className="contact-detail">
              <strong>NextGen IT</strong>
              <p>Digital Solutions • Technology • Innovation</p>
            </div>
          </div>

          <form className="enquiry-form" onSubmit={submitEnquiry}>
            <h3>Tell us about your project</h3>

            <div className="form-row">
              <input name="name" placeholder="Full Name *" value={form.name} onChange={updateForm} required />
              <input name="email" type="email" placeholder="Email Address *" value={form.email} onChange={updateForm} required />
            </div>

            <input name="phone" placeholder="Mobile Number" value={form.phone} onChange={updateForm} />

            <select name="service" value={form.service} onChange={updateForm} required>
              <option value="">Select a service *</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <input name="budget" placeholder="Estimated Budget (optional)" value={form.budget} onChange={updateForm} />

            <textarea name="message" placeholder="Tell us about your project *" value={form.message} onChange={updateForm} required rows="5" />

            <button className="submit-btn" type="submit" disabled={sending}>
              {sending ? "Submitting..." : "Submit Enquiry →"}
            </button>

            {status && <p className="form-status">{status}</p>}
            <small className="privacy-note">Your information will be used to respond to your enquiry.</small>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-icon">N</span>
            <strong>NextGen IT</strong>
            <p>Building possibilities through technology.</p>
          </div>
          <a href="#home">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} NextGen IT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
