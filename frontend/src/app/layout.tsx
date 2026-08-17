import type { Metadata } from 'next';
import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata: Metadata = {
  title: "AstroLive Shubh · Auspicious Timing for Life's Milestones",
  description: 'Personalized milestone decision astrology. Shubh timing windows, lucky registration numbers, ideal direction and auspicious dates calculated from your birth details.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
