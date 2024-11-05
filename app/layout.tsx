import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Logo from '../app/icon.png';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recruiter",
  description: "Recruiter is a platform for keeping track of job applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <main>
          <header className='h-100 max-w-6xl mx-auto px-4 sm:px-8 py-6'>
            <Image src={Logo} alt='logo' className="max-w-12" />
          </header>
          {children}
        </main>
        <footer className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <p>
          Created by <a href="https://ostafinski.cc">@ostafinski</a>
        </p>
      </footer>
      </body>
    </html>
    </ClerkProvider>

  );
}
