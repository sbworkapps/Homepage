import { useEffect, useRef, useState, type FormEvent } from 'react'

function Mark({ className = '' }: { className?: string }) {
  return <span className={`mark ${className}`} aria-hidden="true">+</span>
}

function TechnicalVisual() {
  return (
    <div className="technical-visual" role="img" aria-label="Abstract interface illustration">
      <div className="visual-guide guide-horizontal" />
      <div className="visual-guide guide-vertical" />
      <Mark className="visual-mark mark-top" />
      <Mark className="visual-mark mark-bottom" />
      <div className="orange-field" />
      <div className="window top-window">
        <span className="menu-lines"><i /><i /><i /></span>
        <span className="signal-bars"><i /><i /><i /><i /><i /></span>
        <span className="caret">▼</span>
      </div>
      <div className="window lower-window">
        <div className="window-head"><span /><span /></div>
        <div className="window-body"><span className="ring" /><div className="code-block"><i /><i /><i /><i /><i /><i /></div></div>
      </div>
      <div className="dash dash-one" /><div className="dash dash-two" />
      <span className="side-dots">•<br />•<br />•<br />•</span>
    </div>
  )
}

function DesignVisual() {
  return (
    <div className="about-visual" aria-hidden="true">
      <div className="design-grid" />
      <div className="design-guide design-guide-one" />
      <div className="design-guide design-guide-two" />
      <span className="design-cross cross-one">+</span>
      <span className="design-cross cross-two">+</span>
      <div className="design-window">
        <div className="design-window-top"><i /><i /></div>
        <div className="design-window-content"><div className="design-orb" /><div className="design-copy-lines"><i /><i /><i /><i /></div></div>
      </div>
    </div>
  )
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const submittingRef = useRef(false)

  useEffect(() => {
    const basinScriptId = 'basin-js'
    if (!document.getElementById(basinScriptId)) {
      const basinScript = document.createElement('script')
      basinScript.id = basinScriptId
      basinScript.src = 'https://js.usebasin.com/v2.11.1.min.js'
      basinScript.async = true
      document.body.append(basinScript)
    }

    const isCurrentForm = (event: Event) => (event as CustomEvent<{ form?: HTMLFormElement }>).detail?.form === formRef.current
    const handleSubmitted = (event: Event) => {
      if (isCurrentForm(event)) setStatus('submitting')
    }
    const handleSuccess = (event: Event) => {
      if (!isCurrentForm(event)) return
      submittingRef.current = false
      setStatus('success')
      formRef.current?.reset()
    }
    const handleError = (event: Event) => {
      if (!isCurrentForm(event)) return
      submittingRef.current = false
      setStatus('error')
    }

    document.addEventListener('basinjsFormSubmitted', handleSubmitted)
    document.addEventListener('basinjsFormSuccess', handleSuccess)
    document.addEventListener('basinjsFormError', handleError)
    return () => {
      document.removeEventListener('basinjsFormSubmitted', handleSubmitted)
      document.removeEventListener('basinjsFormSuccess', handleSuccess)
      document.removeEventListener('basinjsFormError', handleError)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (submittingRef.current) {
      event.preventDefault()
      return
    }
    submittingRef.current = true
    setStatus('submitting')
  }

  return (
    <section id="contact" className="contact section-shell reveal-section" data-reveal aria-labelledby="contact-title">
      <Mark className="contact-mark" />
      <div className="contact-heading"><p className="eyebrow">05 / Get in touch</p><h2 id="contact-title">Have a project<br />in mind<span className="orange-dot">?</span></h2><p className="contact-note">Let's build something great.</p></div>
      <form ref={formRef} className="contact-form" aria-labelledby="contact-title" action="https://usebasin.com/f/319c9a9becda" method="POST" data-basin-form="" data-basin-success-action="render" data-basin-spam-protection="recaptcha" onSubmit={handleSubmit}>
        <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="form-field form-message"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} required /></div>
        <button className="form-submit" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
        <p className="form-status" role="status" aria-live="polite">{status === 'submitting' ? 'Sending your message.' : ''}</p>
        <div className="w-form-done form-status form-success" role="status" aria-live="polite">Message sent. I'll be in touch.</div>
        <div className="w-form-fail form-status form-error" role="alert">Something went wrong. Please try again.</div>
      </form>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const illustrationSections = document.querySelectorAll<HTMLElement>('[data-illustration-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const illustrationObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('illustration-visible')
          illustrationObserver.unobserve(entry.target)
        }
      }),
      { threshold: 0.35 },
    )
    sections.forEach((section) => observer.observe(section))
    illustrationSections.forEach((section) => illustrationObserver.observe(section))
    return () => {
      observer.disconnect()
      illustrationObserver.disconnect()
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="SBoyle home">SBoyle</a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /> <span className="sr-only">Menu</span>
        </button>
        <nav id="primary-nav" className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
      <section id="top" className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy reveal">
          <p className="eyebrow">Independent web development</p>
          <h1 id="hero-title">Websites<br />that work<span className="orange-dot">.</span></h1>
          <p className="hero-intro">Custom websites, apps, and ecommerce solutions done right.</p>
          <a className="text-link" href="#contact">Start a conversation <span>↗</span></a>
        </div>
        <TechnicalVisual />
        <div className="hero-footnotes" aria-label="Services at a glance">
          <div><b>01</b><span>Thoughtful<br />planning</span></div><div><b>02</b><span>Bold<br />design</span></div><div><b>03</b><span>Built<br />to last</span></div>
        </div>
      </section>

      <section id="services" className="services section-shell reveal-section" data-reveal aria-labelledby="services-title">
        <div className="section-title"><p>01 / What I do</p><h2 id="services-title">Useful, not<br />overcomplicated.</h2></div>
        <div className="services-list">
          {[
            ['01', 'Websites & applications', 'From a focused marketing site to a tailored web application, built around how your business actually works.'],
            ['02', 'Ecommerce', 'Stores that are clear to use, easy to manage, and ready to support real orders and operations.'],
            ['03', 'Integrations & automation', 'Systems connected properly: APIs, inventory, sales channels, workflows, reporting, and the repetitive tasks in between.'],
            ['04', 'Ongoing development', 'Practical support after launch—improvements, maintenance, new features, and the work that keeps things moving.'],
          ].map(([number, title, copy]) => <article className="service" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="commerce section-shell reveal-section" data-reveal data-illustration-reveal aria-labelledby="commerce-title">
        <div className="commerce-grid"><div><p className="eyebrow">02 / Ecommerce</p><h2 id="commerce-title">More than<br />a storefront.</h2></div><div className="commerce-copy"><p>High-performing, optimized, and easy-to-use ecommerce apps with the customization, integrations, cross-platform sales, and analytics needed to support how you sell.</p><div className="commerce-tags"><span>WooCommerce</span><span>Shopify</span><span>Cross-platform sales</span><span>Migrations</span><span>Integrations</span></div></div></div>
        <div className="commerce-diagram" aria-hidden="true"><div className="diagram-box box-a">Store</div><div className="diagram-line line-a" /><div className="diagram-box box-b">Orders</div><div className="diagram-line line-b" /><div className="diagram-box box-c">Inventory</div><div className="diagram-line line-c" /><div className="diagram-box box-d">Sales channels</div></div>
      </section>

      <section id="approach" className="approach section-shell reveal-section" data-reveal aria-labelledby="approach-title"><div className="section-title"><p>03 / Approach</p><h2 id="approach-title">A direct<br />way to work.</h2></div><ol>{[['01', 'Plan', 'A clear route forward before time is spent building.'], ['02', 'Build', 'Thoughtful development, steady communication, and visible progress.'], ['03', 'Launch', 'Test the details, make improvements, then put it to work.'], ['04', 'Support', 'Keep improving with practical maintenance and new features as needed.']].map(([n, t, c]) => <li key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></li>)}</ol></section>

      <section id="about" className="about section-shell reveal-section" data-reveal data-illustration-reveal aria-labelledby="about-title"><p className="eyebrow">04 / Bold design</p><h2 id="about-title">Bold<br />design<span className="orange-dot">.</span></h2><div className="about-copy"><p>Design should make the right things clear. I create focused interfaces with strong structure, purposeful type, and details that help people understand what to do next. The result looks distinct, works naturally, and gives the product or business room to grow.</p></div><DesignVisual /></section>

      <ContactForm />
      </main>
      <footer><a className="logo" href="#top" aria-label="Back to top">SBoyle</a><span>SBoyle © {new Date().getFullYear()}</span><a href="#contact">Contact</a></footer>
    </>
  )
}

export default App
