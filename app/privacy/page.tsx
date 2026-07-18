export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-slate-800 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Privacy</h1>
      <div className="mt-6 space-y-4 text-sm leading-7">
        <p>The navigator is designed to use session-only conversation context, such as a general role, state, insurance type, or preference for step-by-step guidance, to make replies more useful during a visit.</p>
        <p>Please avoid entering identifying or highly sensitive information. The app does not ask for your full name, address, insurance ID, medical-record number, claim number, or photos.</p>
        <p>This prototype does not intentionally store full chat transcripts for analytics.</p>
      </div>
    </main>
  );
}
