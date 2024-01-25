import { PlansProvider } from '@/contexts/PlansContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Snackbar from '@/components/Snackbar';
import { Analytics } from '@vercel/analytics/react';
import './globals.scss';
import './index.scss';

export const metadata: Metadata = {
  title: 'Plan Master',
  description: 'Stay organized and achieve more goals using a planning app for your tasks',
  openGraph: {
    title: 'Plan Master',
    description: 'Stay organized and achieve more goals using a planning app for your tasks',
    url: 'https://plan-master-pro.vercel.app',
    siteName: 'Plan Master',
    images: [
      {
        url: '%PUBLIC_URL%/assets/og_img.jpg',
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: "Plan Master",
    description: "Stay organized and achieve more goals using a planning app for your tasks",
    site: "https://plan-master-pro.vercel.app",
    images: "%PUBLIC_URL%/assets/og_img.jpg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PlansProvider>
            <div className='App'>
              <Nav />
              <main className='App__Inner container'>
                {children}
              </main>
              <Footer />
              <Snackbar />
            </div>
          </PlansProvider>
        </AuthProvider>
        <div id='popupPortal'></div>
        <Analytics />
      </body>
    </html>
  )
}
