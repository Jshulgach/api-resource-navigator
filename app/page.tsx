import Image from "next/image";
import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { SavedResourcesProvider } from "@/components/SavedResources";

export default function Home() {
  return (
    <div id="top" className="min-h-screen text-ink">
      <Header />
      <SavedResourcesProvider>
      <main>
        <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-white sm:min-h-[72vh]">
          <Image
            alt="A person with a lower-leg prosthesis sitting comfortably at home."
            className="object-cover object-[64%_center]"
            fill
            priority
            sizes="100vw"
            src="/images/next-step-hero.png"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-white/30" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:pb-20">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-wide text-spruce">Accessible Prosthetics Initiative</p>
              <h1 className="mt-4 text-5xl font-bold leading-[1.03] text-ink sm:text-6xl">
                A clear next step, when you need one.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-700">
                Practical support and trusted resources for people affected by limb loss, at your own pace.
              </p>
              <a className="mt-8 inline-flex rounded-md bg-spruce px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md" href="#start">
                Start here
              </a>
            </div>
          </div>
        </section>

        <section id="start" className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-clay">Begin with what matters now</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">You do not need to tell the whole story to get started.</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">Choose a starting point, ask in your own words, or simply keep a resource for later.</p>
            </div>
            <div className="mt-10"><Chat /></div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-mist">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:py-16">
            <div>
              <p className="text-sm font-bold text-spruce">01</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Start where you are</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">Ask one question, choose a path, or take a moment before deciding what comes next.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-spruce">02</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Find trusted help</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">Recommendations point to public agencies and established organizations, with clear source details.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-spruce">03</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Keep a simple plan</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">Save useful links and prepare questions for a prosthetist, insurance call, or support conversation.</p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <ResourceBrowser />
          </div>
        </section>
      </main>
      </SavedResourcesProvider>
      <Footer />
    </div>
  );
}
