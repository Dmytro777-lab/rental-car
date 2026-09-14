import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="status-panel">
      <h1>Page not found</h1>
      <p>Let’s find a car for your next journey instead.</p>
      <Link href="/catalog" className="button">
        View Catalog
      </Link>
    </main>
  );
}
