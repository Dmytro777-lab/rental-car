import Image from 'next/image';
import Link from 'next/link';
import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.hero}>
      <Image className={css.heroImage} src="/MainBanner.png" alt="" fill sizes="100vw" />
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog" className={css.catalogLink}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
