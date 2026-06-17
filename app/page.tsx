import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { SafetyNotice } from "@/components/SafetyNotice";

export default function Home() {
  return (
    <div className="min-h-screen text-ink">
      <Header />
      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
          <div className="flex flex-col justify-center gap-6">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-clay">
                Public resource navigator
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Find prosthetics, limb-loss, and amputation resources faster
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                A nonprofit resource navigator for people with limb loss, caregivers, clinicians,
                and community members.
              </p>
            </div>
            <SafetyNotice />
          </div>
          <Chat />
        </section>

        <section className="bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <ResourceBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
