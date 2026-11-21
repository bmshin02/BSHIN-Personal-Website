function GuestbookPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          Guestbook
        </p>

        <h1 className="mt-4 text-5xl font-pixel font-normal sm:text-7xl">
          Leave a message
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Thanks for visiting my website. Feel free to leave a message,
          suggestion, or greeting below.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <iframe
            src="https://brandonshin.atabook.org/"
            title="Guestbook"
            loading="lazy"
            className="h-[800px] w-full border-0"
          />
        </div>
      </div>
    </main>
  );
}

export default GuestbookPage;
