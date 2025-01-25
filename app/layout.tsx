import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learnings of Life of an 18yr Old',
  description: 'Welcome to Learnings of life of an 18 yr old, a podcast created by an eighteen year old Indian girl who has been through many such situations in her life that has helped fill her bag of experience with tons of learnings and life lessons that she very kindly decided to share with the world for she wants them to know that they are not alone.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
