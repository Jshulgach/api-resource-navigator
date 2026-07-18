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
              <h1 className="text-5xl font-bold leading-[1.03] text-ink sm:text-6xl">
                Find your next step.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-700">
                Trusted support, at your pace.
              </p>
              <a className="mt-8 inline-flex rounded-md bg-spruce px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md" href="#chat">
                Begin
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
            <Chat />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-mist">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:py-16">
            <div>
              <p className="text-sm font-bold text-spruce">01</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Start with one question</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">Share only what feels useful.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-spruce">02</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Find trusted help</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">See who stands behind every resource.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-spruce">03</p>
              <h2 className="mt-3 text-xl font-bold text-ink">Keep what helps</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">Save links and prepare for a conversation.</p>
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
