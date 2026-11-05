import './globals.css';
import GlobalProgress from '@/components/GlobalProgress';

export const metadata = {
  title: 'TopNotch — Business Support & Managed Digital Services',
  description:
    'Top-Notch is a business support company built to help businesses operate, grow, and stay focused on what matters most. Specialized teams across Social Media, Bookkeeping, Automation, VA, Design, Video, Web Dev, CRM, Research & Admin.',
  keywords: [
    'business support', 'managed digital services', 'virtual assistance',
    'social media management', 'bookkeeping', 'automation', 'graphic design',
    'website development', 'CRM support', 'GHL', 'administrative support', 'TopNotch',
  ],
  openGraph: {
    title: 'TopNotch — You Bring the Need. We Bring the Right Team.',
    description:
      'One Company. Specialized Teams. Coordinated Support. Top-Notch handles your business support needs so you can focus on growth.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TopNotch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopNotch — Business Support & Managed Digital Services',
    description: 'You Bring the Need. We Bring the Right Team.',
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalProgress />
        {children}
      </body>
    </html>
  );
}
