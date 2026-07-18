import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { SavedResourcesProvider } from "@/components/SavedResources";

export default function Home() {
  return (
    <div className="min-h-screen text-ink">
      <Header />
      <SavedResourcesProvider>
      <main>
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Find your next step.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Support and practical resources for people affected by limb loss.
              </p>
            </div>
          </div>
          <div className="mt-8"><Chat /></div>
        </section>

        <section className="bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <ResourceBrowser />
          </div>
        </section>
      </main>
      </SavedResourcesProvider>
      <Footer />
    </div>
  );
}
