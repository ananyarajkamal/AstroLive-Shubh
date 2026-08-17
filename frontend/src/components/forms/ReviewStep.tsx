import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { VahanInputData } from '../../lib/types';
import { formatDate } from '../../lib/formatters';
import { User, Car, Edit3, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ReviewStepProps {
  data: VahanInputData;
  onEditStep: (step: number) => void;
  onCalculate: () => void;
}

export function ReviewStep({ data, onEditStep, onCalculate }: ReviewStepProps) {
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">
          {lang === 'hi' ? 'विवरण समीक्षा' : 'Review Details'}
        </h2>
        <p className="text-xs text-[#526071] mt-1">
          {lang === 'hi'
            ? 'शुभ मुहूर्त गणना चलाने से पहले अपने जन्म विवरण, वाहन और डिलीवरी समय सीमा की पुष्टि करें।'
            : 'Verify your personal birth details, vehicle marque, and delivery date range before running the deterministic Muhurat computation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Birth Details Card */}
        <Card variant="default" className="relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8860B] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {lang === 'hi' ? 'जन्म प्रोफाइल' : 'Birth Profile'}
            </h3>
            <button
              onClick={() => onEditStep(1)}
              className="text-xs text-[#526071] hover:text-[#0B132B] flex items-center gap-1 transition-colors font-medium"
            >
              <Edit3 className="w-3 h-3" /> {lang === 'hi' ? 'संपादित करें' : 'Edit'}
            </button>
          </div>
          <div className="space-y-2 text-xs text-[#1E242B]">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">{lang === 'hi' ? 'पूरा नाम:' : 'Full Name:'}</span>
              <span className="font-bold text-[#0B132B]">{data.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">{lang === 'hi' ? 'जन्म तिथि:' : 'Date of Birth:'}</span>
              <span>{formatDate(data.dateOfBirth)}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">{lang === 'hi' ? 'जन्म समय:' : 'Birth Time:'}</span>
              <span>{data.birthTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">{lang === 'hi' ? 'जन्म शहर:' : 'Birth City:'}</span>
              <span className="text-[#0B132B] font-bold">{data.birthCity}</span>
            </div>
          </div>
        </Card>

        {/* Vehicle & Delivery Window Card */}
        <Card variant="default" className="relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8860B] flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> {lang === 'hi' ? 'वाहन एवं अवधि' : 'Vehicle & Window'}
            </h3>
            <button
              onClick={() => onEditStep(2)}
              className="text-xs text-[#526071] hover:text-[#0B132B] flex items-center gap-1 transition-colors font-medium"
            >
              <Edit3 className="w-3 h-3" /> {lang === 'hi' ? 'संपादित करें' : 'Edit'}
            </button>
          </div>
          <div className="space-y-2 text-xs text-[#1E242B]">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">{lang === 'hi' ? 'वाहन श्रेणी:' : 'Vehicle Category:'}</span>
              <span className="font-bold text-[#0B132B]">{data.vehicleType}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">{lang === 'hi' ? 'मॉडल का नाम:' : 'Model Name:'}</span>
              <span className="font-medium">{data.vehicleModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">{lang === 'hi' ? 'डिलीवरी समय सीमा:' : 'Delivery Window:'}</span>
              <span className="text-xs font-mono font-medium text-[#0B132B]">
                {formatDate(data.deliveryStartDate)} {lang === 'hi' ? 'से' : '→'} {formatDate(data.deliveryEndDate)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#EAE5DC] text-xs text-[#526071] flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#B8860B] shrink-0" />
        <p>
          {lang === 'hi'
            ? 'गणना के लिए तैयार। नीचे क्लिक करने पर 5-आउटपुट गणना श्रृंखला (शुभ मुहूर्त, भाग्यशाली अंक, शुभ रंग, प्रथम ड्राइव दिशा, वाहन पत्र) शुरू होगी।'
            : 'Ready to compute. Clicking below triggers the 5-output calculation sequence (Shubh Window, Lucky Numbers, Auspicious Colour, First Drive Direction, Vahan Patra).'}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#EAE5DC]">
        <Button type="button" variant="outline" onClick={() => onEditStep(3)}>
          {lang === 'hi' ? '← डिलीवरी समय संपादित करें' : '← Edit Delivery Window'}
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onCalculate}>
          {lang === 'hi' ? 'वाहन शुभ मार्गदर्शन →' : 'Calculate My Vahan →'}
        </Button>
      </div>
    </div>
  );
}
