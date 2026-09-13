import { Manrope } from 'next/font/google';
import Header from '@/components/Header/Header';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import type { Metadata } from 'next';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'Search for cars, view specifications, and submit a rental request.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
