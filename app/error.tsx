'use client';

type ErrorPageProps = {
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main id="main-content" className="status-panel">
      <h1>Something went wrong</h1>
      <p>Please try loading the page again.</p>
      <button className="button" type="button" onClick={retry}>
        Try again
      </button>
    </main>
  );
}
