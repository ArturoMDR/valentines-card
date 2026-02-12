'use client';

import { Suspense, useEffect, useState } from 'react';
import InteractiveFaceCard from '../components/CardStyles/InteractiveFaceCard';

function CardContent() {
  const [params, setParams] = useState<{
    style: string;
    recipient?: string;
    requestor?: string;
    phone?: string;
  }>({ style: 'interactive-face' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setParams({
        style: searchParams.get('style') || 'interactive-face',
        recipient: searchParams.get('recipient') || undefined,
        requestor: searchParams.get('requestor') || undefined,
        phone: searchParams.get('phone') || undefined,
      });
    }
  }, []);

  // Render card based on style
  switch (params.style) {
    case 'interactive-face':
      return (
        <InteractiveFaceCard
          recipientName={params.recipient}
          requestorName={params.requestor}
          phoneNumber={params.phone}
        />
      );
    default:
      return (
        <InteractiveFaceCard
          recipientName={params.recipient}
          requestorName={params.requestor}
          phoneNumber={params.phone}
        />
      );
  }
}

export default function CardPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-rose-200">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">💕</div>
          <p className="text-xl text-pink-600">Loading your card...</p>
        </div>
      </div>
    }>
      <CardContent />
    </Suspense>
  );
}
