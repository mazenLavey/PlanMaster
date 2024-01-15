import { PlansProvider } from '@/contexts/PlansContext';
import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Plan Master',
  description: 'Stay organized and achieve more goals using a planning app for your tasks',
  openGraph: {
    title: 'Plan Master',
    description: 'Stay organized and achieve more goals using a planning app for your tasks',
    url: 'https://planmaster.netlify.app',
    siteName: 'Plan Master',
    images: [
      {
        url: 'https://planmaster.netlify.app/og_img.png',
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: "Plan Master",
    description: "Stay organized and achieve more goals using a planning app for your tasks",
    site: "https://planmaster.netlify.app",
    images: "https://planmaster.netlify.app/og_img.png",
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
        <PlansProvider>
          <div className='app'>
            <Nav />
            <main className='container'>
              {children}
            </main>
            <Footer />
          </div>
        </PlansProvider>
        <div id='popupPortal'></div>
      </body>
    </html>
  )
}
