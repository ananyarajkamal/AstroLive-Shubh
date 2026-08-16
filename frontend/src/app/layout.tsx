import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: "AstroLive Vahan — Your Vehicle's Auspicious Moment, Personalised",
  description: 'Personalised vehicle astrology. Shubh delivery windows, lucky registration numbers, ideal colour and first drive direction — calculated from your birth details.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
