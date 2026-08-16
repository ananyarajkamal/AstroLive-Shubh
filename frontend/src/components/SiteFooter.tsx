/* SiteFooter.tsx - AstroLive Shubh Editorial Footer with Bilingual Support */
'use client';
import React from 'react';
import Link from 'next/link';
import SiteLogo from './SiteLogo';
import { useLanguage } from '../context/LanguageContext';

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: '#030A14', color: '#F4EFE3', paddingTop: 64, paddingBottom: 40, borderTop: '1px solid #C6A15B' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <SiteLogo variant="light" size="large" />
            </div>
            <p style={{ color: '#B8B2A5', fontSize: 13, lineHeight: 1.7, maxWidth: 340 }}>
              {t.footer.brandDesc}
            </p>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#C6A15B', marginBottom: 16 }}>{t.footer.collectionTitle}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/vahan/calculate" style={{ color: '#F4EFE3', fontSize: 13, textDecoration: 'none' }}>{t.footer.vahanLink}</Link>
              <Link href="/griha" style={{ color: '#B8B2A5', fontSize: 13, textDecoration: 'none' }}>{t.footer.grihaLink}</Link>
              <Link href="/vyapar" style={{ color: '#B8B2A5', fontSize: 13, textDecoration: 'none' }}>{t.footer.vyaparLink}</Link>
              <Link href="/swarna" style={{ color: '#B8B2A5', fontSize: 13, textDecoration: 'none' }}>{t.footer.swarnaLink}</Link>
            </div>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#C6A15B', marginBottom: 16 }}>{t.footer.builtOnTitle}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#B8B2A5' }}>
              <span>{t.footer.swiss}</span>
              <span>{t.footer.lahiri}</span>
              <span>{t.footer.chaldean}</span>
              <span>{t.footer.vastu}</span>
            </div>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#C6A15B', marginBottom: 16 }}>{t.footer.privateTitle}</p>
            <p style={{ fontSize: 12, color: '#B8B2A5', lineHeight: 1.65 }}>
              {t.footer.privateDesc}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(198, 161, 91, 0.2)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 12, color: '#B8B2A5' }}>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
