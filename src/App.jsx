import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MessagesSquare,
  Languages,
  MessageCircle,
  MessageSquare,
  Database,
  Headphones,
  Workflow,
  Globe,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  MapPin,
} from 'lucide-react'
import LeadForm from './components/LeadForm'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Content
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_FULL = [
  {
    icon: Languages,
    title: 'Vernacular-language agents',
    text: 'Agents that understand and reply in Telugu, Hindi, Tamil and more — including romanized text like Tenglish and Hinglish.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp chatbots',
    text: 'Meet customers where they already are. Automated answers, lead capture and booking, right inside WhatsApp.',
  },
  {
    icon: MessageSquare,
    title: 'Website chat widgets',
    text: 'A smart assistant embedded on your site that answers from your content and hands off cleanly to your team.',
  },
  {
    icon: Database,
    title: 'Data & document Q&A',
    text: 'Agents grounded in your databases and documents (RAG) — real answers with real numbers, not guesses.',
  },
  {
    icon: Headphones,
    title: 'Voice agents',
    text: 'AI that answers calls, qualifies leads and books appointments — natural, patient and always available.',
  },
  {
    icon: Workflow,
    title: 'Workflow automations',
    text: 'Wire your agents into the tools you run on — CRM, sheets, email and more — so the busywork handles itself.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <MessagesSquare className="h-5 w-5 text-deep" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span className={`font-display font-bold tracking-tight text-lg ${scrolled ? 'text-ink' : 'text-white'} transition-colors`}>
              Desh AI
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover ${
                  scrolled ? 'text-ink/70 hover:text-primary-dark' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Desh AI</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero — gradient mesh (no photo), floating multilingual bubbles
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8, stagger: 0.12 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const bubbles = ['नमस्ते', 'హాయ్', 'வணக்கம்', 'Hello', 'হ্যালো', 'ನಮಸ್ಕಾರ']

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-deep text-white">
      {/* gradient mesh */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-[40rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />

      {/* floating language bubbles (top-right) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {bubbles.map((b, i) => (
          <span
            key={b}
            className="absolute font-telugu text-sm text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm animate-float"
            style={{
              top: `${18 + (i % 3) * 16}%`,
              right: `${8 + (i % 2) * 14}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl">
          <p className="hero-meta font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-primary-light mb-6">
            Desh AI · Custom AI agents
          </p>
          <h1 className="font-display font-extrabold leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-5xl md:text-6xl">We build AI agents that speak</span>
            <span className="hero-line-2 block font-serif italic font-medium text-primary text-6xl sm:text-7xl md:text-8xl mt-2" style={{ lineHeight: '0.92' }}>
              every Indian language.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Custom chatbots and assistants for web and WhatsApp — fluent in English and India's regional
            languages, and grounded in your own data.
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/40">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#work" className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full">
              <Sparkles className="h-4 w-4" />
              See the work
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature 1 — Multilingual reply demo (chat thread that cycles language)
---------------------------------------------------------------- */
function MultilingualReply() {
  const threads = [
    { lang: 'తెలుగు', q: 'మీ ధరలు ఎంత?', a: 'మా ప్లాన్‌లు ₹999 నుండి మొదలవుతాయి — వివరాలు పంపనా?' },
    { lang: 'हिन्दी', q: 'क्या आज डिलीवरी होगी?', a: 'जी हाँ — शाम 7 बजे तक। पता भेज दीजिए।' },
    { lang: 'English', q: 'Do you support WhatsApp?', a: 'Absolutely — your agent can live right inside WhatsApp.' },
    { lang: 'Tenglish', q: 'booking ela cheyali?', a: 'Simple! Mee date cheppandi, nenu confirm chestha.' },
  ]
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const cycle = setInterval(() => {
      setTyping(true)
      setTimeout(() => setTyping(false), 700)
      setIdx((i) => (i + 1) % threads.length)
    }, 3200)
    return () => clearInterval(cycle)
  }, [])

  const t = threads[idx]
  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-divider bg-background p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Live agent</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full font-telugu">
          {t.lang}
        </span>
      </div>
      <div key={idx} className="flex flex-col gap-2 flex-1 justify-center" style={{ animation: 'rain-fadein 0.4s ease-out' }}>
        <div className="self-end max-w-[80%] bg-deep text-white text-xs rounded-2xl rounded-br-sm px-3 py-2 font-telugu">{t.q}</div>
        {typing ? (
          <div className="self-start bg-white border border-divider rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        ) : (
          <div className="self-start max-w-[85%] bg-white border border-primary/30 text-ink text-xs rounded-2xl rounded-bl-sm px-3 py-2 font-telugu shadow-sm">
            {t.a}
          </div>
        )}
      </div>
      <style>{`@keyframes rain-fadein { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature 2 — SIGNATURE: rising multilingual chat bubbles
---------------------------------------------------------------- */
function MultilingualBubbles() {
  const [statusIdx, setStatusIdx] = useState(0)
  const statuses = [
    { text: 'Detecting language…', tone: 'primary' },
    { text: 'Understanding intent', tone: 'primary' },
    { text: 'Replying in తెలుగు', tone: 'accent' },
    { text: 'Message sent', tone: 'emerald' },
  ]
  useEffect(() => {
    const i = setInterval(() => setStatusIdx((s) => (s + 1) % statuses.length), 2100)
    return () => clearInterval(i)
  }, [])

  const glyphs = [
    { ch: 'अ', left: '14%', delay: '0s', dur: '3.2s', size: 22 },
    { ch: 'A', left: '30%', delay: '1.1s', dur: '3.6s', size: 18 },
    { ch: 'అ', left: '46%', delay: '0.5s', dur: '3.0s', size: 24 },
    { ch: 'த', left: '60%', delay: '1.8s', dur: '3.4s', size: 20 },
    { ch: 'ব', left: '74%', delay: '0.9s', dur: '3.1s', size: 19 },
    { ch: 'ಕ', left: '86%', delay: '2.1s', dur: '3.5s', size: 21 },
  ]
  const status = statuses[statusIdx]
  const tone =
    status.tone === 'emerald' ? 'text-emerald-600' : status.tone === 'accent' ? 'text-accent-dark' : 'text-primary-dark'
  const dot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #EEF6FF 0%, #E6EEFF 60%, #E9E6FF 100%)' }}>
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-8 h-14 w-24 rounded-full bg-violet-200/50 blur-xl" />

      {/* header */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Languages className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">Multilingual</span>
        </div>
        <span className="font-telugu text-[10px] text-violet-500/80">अ · అ · த · A</span>
      </div>

      {/* rising glyph bubbles */}
      <div className="absolute inset-x-0 top-10 bottom-10 overflow-hidden">
        {glyphs.map((g, i) => (
          <span
            key={i}
            className="absolute font-telugu flex items-center justify-center rounded-2xl bg-white/80 border border-primary/20 text-primary-dark shadow-sm"
            style={{
              left: g.left,
              bottom: 0,
              width: `${g.size + 14}px`,
              height: `${g.size + 14}px`,
              fontSize: `${g.size}px`,
              animation: `bubble-rise ${g.dur} ease-in ${g.delay} infinite`,
              transform: 'translateX(-50%)',
            }}
          >
            {g.ch}
          </span>
        ))}
      </div>

      {/* status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-20">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span key={status.text} className={`font-mono text-[10px] ${tone}`} style={{ animation: 'rain-fadein 0.35s ease-out' }}>
          {status.text}
        </span>
      </div>

      <style>{`
        @keyframes bubble-rise {
          0%   { transform: translate(-50%, 10px); opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translate(-50%, -120px); opacity: 0; }
        }
        @keyframes rain-fadein { from { opacity: 0; transform: translateY(2px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature 3 — Channels shuffler (Web / WhatsApp / Voice)
---------------------------------------------------------------- */
function ChannelShuffler() {
  const items = [
    { tag: 'Web', label: 'Embedded chat widget on your site', Icon: MessageSquare },
    { tag: 'WhatsApp', label: 'Replies & bookings inside WhatsApp', Icon: MessageCircle },
    { tag: 'Voice', label: 'AI that answers and routes calls', Icon: Headphones },
  ]
  const [stack, setStack] = useState(items)
  useEffect(() => {
    const i = setInterval(() => setStack((prev) => {
      const next = [...prev]; next.unshift(next.pop()); return next
    }), 2600)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, offset) => {
        const Icon = item.Icon
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: stack.length - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="h-9 w-9 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary-dark" />
              </span>
            </div>
            <div className="font-display text-lg font-semibold text-ink leading-tight">{item.label}</div>
            <div className="flex items-center gap-1.5">
              {items.map((c) => (
                <span key={c.tag} className={`h-1 rounded-full transition-all ${c.tag === item.tag ? 'w-6 bg-primary' : 'w-1.5 bg-divider'}`} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Features section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Multilingual',
      heading: 'Speaks their language',
      sub: 'Telugu · Hindi · Tamil · more',
      text: 'Your agent detects the language — script or romanized — and replies in kind. No “English only” barrier between you and your customers.',
      Component: MultilingualReply,
    },
    {
      eyebrow: '02 / Understanding',
      heading: 'Gets the intent',
      sub: 'Any script, any phrasing',
      text: 'Behind every message it detects language and intent, finds the right answer in your data, and responds naturally — not with canned menus.',
      Component: MultilingualBubbles,
    },
    {
      eyebrow: '03 / Channels',
      heading: 'Wherever they are',
      sub: 'Web · WhatsApp · Voice',
      text: 'One agent, every channel — embedded on your site, live in WhatsApp, or answering the phone. Same brain, same answers.',
      Component: ChannelShuffler,
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ What we build</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Agents that actually
            <span className="block font-serif italic font-medium text-primary-dark mt-1">connect.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-primary-dark group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </div>
              <card.Component />
              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pillars — qualitative statements
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const pillars = [
    { n: '01', title: 'Languages', statement: 'Vernacular-first', label: 'not just English', desc: 'Most chatbots only do English. Ours meet your customers in Telugu, Hindi, Tamil and more — script or romanized.' },
    { n: '02', title: 'Channels', statement: 'Web + WhatsApp', label: 'where your customers are', desc: 'One agent across your website, WhatsApp and voice — so people get answers in the place they already use.' },
    { n: '03', title: 'Grounding', statement: 'Built on your data', label: 'real answers, not guesses', desc: 'Agents grounded in your own documents and databases, so replies are accurate and on-brand — not generic AI fluff.' },
  ]

  return (
    <section id="approach" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">╱ Why Desh</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              What sets the work
              <span className="block font-serif italic font-medium text-primary-dark">apart.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three things every Desh AI build gets right — not buzzwords, just what makes an agent actually useful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>
              <div className="leading-none min-h-[7rem] sm:min-h-[9rem] flex items-end">
                <h3 className="font-display font-extrabold text-5xl sm:text-6xl md:text-[4.25rem] leading-[0.95] text-ink tracking-tight text-balance">
                  {p.statement}
                </h3>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`@keyframes pillar-sweep { 0% { transform: translateX(-100%) } 50% { transform: translateX(100%) } 100% { transform: translateX(100%) } }`}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — sticky 3-step (graphic visuals, no photos)
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', endTrigger: cards[cards.length - 1], end: 'top top+=120', scrub: 1 },
          scale: 0.92, filter: 'blur(6px) saturate(0.7)', opacity: 0.5, ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    { num: '01', title: 'Discover', tagline: 'We map the job.', text: 'We learn your customers, the languages they use, the channels they live on, and the data your agent must know. You get a clear scope and a fixed quote before anything is built.', Icon: Sparkles, meta: 'Step 1 / Discover' },
    { num: '02', title: 'Build', tagline: 'We make it real.', text: 'We build and tune the agent on your data, wire up web/WhatsApp/voice, and test it across languages and edge cases — so it’s accurate, on-brand and safe before it ever meets a customer.', Icon: Workflow, meta: 'Step 2 / Build' },
    { num: '03', title: 'Deploy & support', tagline: 'We stay on.', text: 'We launch, watch the real conversations, and keep improving. A shipped agent is the start of the relationship, not the end — you get ongoing tuning and support.', Icon: ShieldCheck, meta: 'Step 3 / Support' },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ How we work</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">Idea to live agent.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => {
          const Icon = step.Icon
          return (
            <article key={idx} className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5">
              <div className="grid lg:grid-cols-5 gap-0 min-h-[52vh] lg:min-h-[60vh]">
                <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">Desh process</span>
                  </div>
                  <div className="my-12">
                    <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">{step.num}</span>
                    <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">{step.title}</h3>
                    <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                  </div>
                  <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
                </div>
                <div className="lg:col-span-2 relative overflow-hidden min-h-[220px] lg:min-h-full bg-deep flex items-center justify-center">
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                  <Icon className="relative h-20 w-20 text-primary" strokeWidth={1.4} />
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/60">{step.num} / Desh AI</div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services grid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Services</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              Everything your
              <span className="block font-serif italic font-medium text-primary">agent can do.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            Mix and match — most projects start with one channel and grow. We scope to your goals, not a fixed package.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Work — JalSathi flagship case study
---------------------------------------------------------------- */
function CaseStudy() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="work" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Flagship work</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
            Proof, not promises:
            <span className="block font-serif italic font-medium text-primary-dark">meet JalSathi.</span>
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-0 rounded-6xl overflow-hidden border border-divider shadow-2xl shadow-primary/5 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* visual */}
          <div className="relative min-h-[320px] bg-deep overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1400&q=80"
              alt="Rivers across the Andhra Pradesh landscape"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-deep via-deep/50 to-primary/20" />
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Live demo</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-telugu text-white/90 text-lg leading-snug">శ్రీశైలం నీటి నిల్వ ఎంత?</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 mt-1">asked in Telugu · answered live</p>
            </div>
          </div>

          {/* copy */}
          <div className="bg-surface p-8 sm:p-12 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mb-4">Water-intelligence agent · Andhra Pradesh</span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">JalSathi</h3>
            <p className="text-muted text-[15px] mt-4 leading-relaxed">
              A public AI agent that answers questions about reservoirs, groundwater, rainfall and rivers across
              Andhra Pradesh — in English, Telugu and Tenglish — grounded in official government data. It’s the
              full Desh playbook in one product: vernacular language, real data, instant answers.
            </p>
            <ul className="mt-6 space-y-2.5">
              {['Telugu · Tenglish · English', 'Grounded in official water data', 'Built end-to-end and shipped'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://jalsathi-app.onrender.com/" target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/30">
                View live demo <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="lift-on-hover inline-flex items-center gap-2 border border-divider text-ink font-medium px-6 py-3 rounded-full hover:border-primary/40">
                Want one like this?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const badges = [
    { Icon: Sparkles, title: 'Ships production agents', text: 'Not slideware or demos — real agents that go live and handle real conversations, like JalSathi.' },
    { Icon: Lock, title: 'Your data stays private', text: 'We build on your data securely and never resell it. Clear scope, clear ownership, no surprises.' },
    { Icon: Globe, title: 'Speaks Indian languages', text: 'Vernacular support is the default, not an afterthought — script and romanized, across channels.' },
  ]

  return (
    <section className="relative py-14 sm:py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Why work with us</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">Built to be trusted.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <Icon className="h-6 w-6 text-primary-dark mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30">
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact
---------------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Start a project</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Let's build your
              <span className="block font-serif italic font-medium text-primary-dark">agent.</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Tell us what you're trying to automate, the languages and channels you need, and we'll come back with a clear plan and quote.
            </p>

            <div className="mt-10 space-y-4">
              <a href="mailto:hello@deshai.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary-dark group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Email</span>
                  <span className="font-display font-semibold text-ink text-lg">hello@deshai.com</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Build in</span>
                  <span className="font-display font-semibold text-ink text-lg">English + Indian languages</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Working</span>
                  <span className="font-display font-semibold text-ink text-lg">Remote · India & worldwide</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">No spam</p>
              <p className="text-sm text-muted leading-relaxed">
                We only use your details to reply to this enquiry. No third-party marketing, and you can ask us to delete your data anytime.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              <LeadForm
                submitLabel="Start the conversation"
                successTitle="Thanks — message received"
                successText="We'll get back to you shortly to talk through your project."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            AI agents that
            <span className="font-serif italic font-medium text-primary block">speak human.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Desh AI — custom chatbots, voice and automations for web and WhatsApp, in the languages your customers actually use.
            </p>
            <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <MessagesSquare className="h-5 w-5 text-deep" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-lg">Desh AI</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              We build custom AI agents — multilingual chatbots, voice agents and automations — grounded in your data and live where your customers are.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 4).map((s, i) => (
                <li key={i}><a href="#services" className="text-white/65 hover:text-primary transition text-sm">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Desh AI</p>
            <ul className="space-y-2.5">
              <li><a href="#work" className="text-white/65 hover:text-primary transition text-sm">Work</a></li>
              <li><a href="#process" className="text-white/65 hover:text-primary transition text-sm">Process</a></li>
              <li><a href="https://jalsathi-app.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-primary transition text-sm">JalSathi demo</a></li>
              <li><a href="#contact" className="text-white/65 hover:text-primary transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li><a href="mailto:hello@deshai.com" className="text-white/65 hover:text-primary transition text-sm">hello@deshai.com</a></li>
              <li className="text-white/65 text-sm">Remote · India & worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Available for new projects</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms</Link>
            <span>© 2026 Desh AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <CaseStudy />
        <TrustSignals />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
