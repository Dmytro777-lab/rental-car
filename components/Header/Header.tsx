import Link from 'next/link';
import Navigation from '@/components/Header/Navigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link className={css.logo} href="/">
          Rental<span className={css.logoAccent}>Car</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
