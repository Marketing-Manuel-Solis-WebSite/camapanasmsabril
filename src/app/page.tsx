import Image from "next/image";
import {
  CallLink,
  ScrollDepthTracker,
  SectionView,
  SessionTracker,
} from "./_components/tracking";

const TELEFONO_DISPLAY = "+52 55 0000 0000";
const TELEFONO_TEL = "+525500000000";
const IMAGEN_CAMPANA = "/imagen-campana.png";
const LOGO_ICON = "/android-chrome-512x512.png";

const HAS_IMAGE = true;

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg text-ink">
      <SessionTracker />
      <ScrollDepthTracker />
      <Header />
      <main className="flex-1 pb-36">
        <Hero />
        <SectionView name="trust_bar">
          <TrustBar />
        </SectionView>
        <SectionView name="closing_cta" threshold={0.5}>
          <ClosingCTA />
        </SectionView>
      </main>
      <Footer />
      <StickyCall />
    </div>
  );
}

/* -------------------- Header -------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-[var(--line)] bg-bg/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <Image
            src={LOGO_ICON}
            alt="Manuel Solís"
            width={34}
            height={34}
            className="rounded-full ring-1 ring-[var(--line-strong)]"
          />
          <div className="leading-tight">
            <p className="font-serif text-[1.05rem] text-ink">Manuel Solís</p>
            <p className="kicker text-[0.58rem] text-gold-deep">Firma Legal</p>
          </div>
        </div>
        <CallLink
          location="header"
          phone={TELEFONO_TEL}
          phoneDisplay={TELEFONO_DISPLAY}
          ariaLabel="Llamar ahora"
          className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition active:scale-95"
        >
          <PhoneIcon className="h-[18px] w-[18px]" />
        </CallLink>
      </div>
    </header>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-md px-5 pt-8 pb-10">
        <div className="reveal flex flex-col items-center text-center">
          <span className="kicker inline-flex items-center gap-2 text-gold-deep">
            <span className="h-px w-6 bg-gold/70" />
            Asesoría legal profesional
            <span className="h-px w-6 bg-gold/70" />
          </span>

          <h1 className="mt-5 font-serif text-[2.35rem] leading-[1.05] tracking-tight text-ink">
            Tu caso merece una{" "}
            <em className="not-italic text-gold-deep">defensa seria</em>.
          </h1>

          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
            Habla directo con un abogado. Respuestas claras y acompañamiento
            real.
          </p>

          <HeroImage />

          <div className="mt-7 w-full">
            <BigCallButton location="hero" />
            <p className="mt-3 text-xs text-muted">
              Atención personal · Confidencialidad absoluta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className="relative mt-7 w-full">
      <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-[var(--line-strong)] bg-bg-cream">
        {HAS_IMAGE ? (
          <Image
            src={IMAGEN_CAMPANA}
            alt="Manuel Solís · Firma Legal"
            fill
            priority
            quality={95}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 448px"
            className="object-cover"
          />
        ) : (
          <HeroPlaceholder />
        )}
      </div>
    </div>
  );
}

function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#faf7f1] via-white to-[#f1ead9] p-6">
      <div className="flex items-start justify-between">
        <span className="kicker text-gold-deep">Firma legal</span>
        <Image
          src={LOGO_ICON}
          alt=""
          width={40}
          height={40}
          className="rounded-full ring-1 ring-[var(--line-strong)]"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="h-px w-12 bg-gold/70" />
        <p className="mt-3 font-serif text-2xl leading-tight text-ink">
          Atención humana,
          <br />
          <em className="not-italic text-gold-deep">
            resultados claros.
          </em>
        </p>
        <p className="mt-2 text-xs text-muted">
          Manuel Solís · Asesoría profesional
        </p>
      </div>
    </div>
  );
}

/* -------------------- Trust bar -------------------- */

function TrustBar() {
  const items = [
    { k: "+15", l: "Años" },
    { k: "24h", l: "Respuesta" },
    { k: "100%", l: "Discreción" },
  ];
  return (
    <section className="mx-auto w-full max-w-md px-5">
      <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-cream">
        {items.map((i, idx) => (
          <div
            key={i.l}
            className={`px-3 py-4 text-center ${
              idx < items.length - 1 ? "border-r border-[var(--line)]" : ""
            }`}
          >
            <p className="font-serif text-2xl text-gold-deep">{i.k}</p>
            <p className="mt-0.5 text-[0.7rem] uppercase tracking-widest text-muted">
              {i.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Closing CTA -------------------- */

function ClosingCTA() {
  return (
    <section className="mx-auto w-full max-w-md px-5 pt-10">
      <div className="rounded-3xl border border-[var(--line-strong)] bg-bg-cream px-6 py-10 text-center">
        <span className="kicker text-gold-deep">Orientación directa</span>
        <h2 className="mt-3 font-serif text-[1.75rem] leading-tight text-ink">
          Una llamada puede cambiar{" "}
          <em className="not-italic text-gold-deep">todo tu caso</em>.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Cuéntanos tu situación. Te respondemos con claridad y honestidad.
        </p>
        <div className="mt-6">
          <BigCallButton location="closing" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Big Call Button (reusable) -------------------- */

function BigCallButton({
  location,
}: {
  location: "hero" | "closing";
}) {
  return (
    <CallLink
      location={location}
      phone={TELEFONO_TEL}
      phoneDisplay={TELEFONO_DISPLAY}
      className="cta-shine relative flex h-16 w-full items-center justify-center gap-3 rounded-full bg-gold-deep px-6 text-white shadow-[0_18px_40px_-12px_rgba(154,122,69,0.55)] transition active:scale-[0.98]"
    >
      <span className="pulse-ring" aria-hidden />
      <PhoneIcon className="h-5 w-5" />
      <span className="text-base font-semibold tracking-wide">
        Llamar ahora
      </span>
      <span className="text-sm font-medium text-white/85 tabular-nums">
        · {TELEFONO_DISPLAY}
      </span>
    </CallLink>
  );
}

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pb-32 pt-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2 px-5 text-center">
        <Image
          src={LOGO_ICON}
          alt="Manuel Solís"
          width={26}
          height={26}
          className="rounded-full"
        />
        <p className="font-serif text-sm text-ink">Manuel Solís · Firma Legal</p>
        <p className="text-[0.7rem] text-muted">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* -------------------- Sticky CTA (siempre visible) -------------------- */

function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 safe-bottom bg-gradient-to-t from-bg via-bg/95 to-bg/0 pt-6">
      <div className="mx-auto w-full max-w-md px-4">
        <CallLink
          location="sticky"
          phone={TELEFONO_TEL}
          phoneDisplay={TELEFONO_DISPLAY}
          className="cta-shine relative flex h-16 w-full items-center justify-center gap-3 rounded-full bg-ink text-white shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)] transition active:scale-[0.98]"
        >
          <span
            className="pulse-ring"
            style={{ boxShadow: "0 0 0 0 rgba(17,20,24,0.45)" }}
            aria-hidden
          />
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-deep">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold">Llamar ahora</span>
        </CallLink>
      </div>
    </div>
  );
}

/* -------------------- Íconos -------------------- */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
