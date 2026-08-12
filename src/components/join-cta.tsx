import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function JoinCta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="join" className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[80vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span className="section-label">Join EGO 42</span>
        <h2 className="mt-6 font-display text-[13vw] font-black uppercase italic leading-[0.85] tracking-tighter text-foreground sm:text-8xl">
          Unleash your
          <span className="block text-primary">ego</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          Get the first training block, our benchmark testing guide and early access to new drops.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="join-email">
            Email address
          </label>
          <input
            id="join-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="min-w-0 flex-1 border border-border bg-card px-5 py-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 font-display text-sm font-black uppercase italic tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary-glow"
          >
            {sent ? (
              <>
                You're in <Check size={18} />
              </>
            ) : (
              <>
                Join now <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
