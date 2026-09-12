'use client';
import css from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  let isHomeActive = false;
  let isCatalogActive = false;
  if (pathname === '/') {
    isHomeActive = true;
  }
  if (pathname === '/catalog' || pathname.startsWith('/catalog/')) {
    isCatalogActive = true;
  }

  return (
    <nav aria-label="Main navigation">
      <ul className={css.navList}>
        <li>
          <Link
            aria-current={isHomeActive ? 'page' : undefined}
            href="/"
            className={isHomeActive ? `${css.navLink} ${css.active}` : css.navLink}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            aria-current={
              pathname === '/catalog' ? 'page' : isCatalogActive ? 'location' : undefined
            }
            href="/catalog"
            className={isCatalogActive ? `${css.navLink} ${css.active}` : css.navLink}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
