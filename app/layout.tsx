import '@/styles/globals.scss';
import { PlansProvider } from '@/contexts/PlansContext';
import Nav from '@/components/layouts/Nav';
import Footer from '@/components/layouts/Footer';

export const metadata = {
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
          <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <Nav />
            <div className='container'>
              {children}
            </div>
            <Footer/>
          </div>
        </PlansProvider>
        <div id='popupPortal'></div>
      </body>
    </html>
  )
}
