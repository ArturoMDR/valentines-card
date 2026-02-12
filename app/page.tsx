'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CardStylePreview from './components/CardStylePreview';

type CardStyle = {
  id: string;
  name: string;
  description: string;
  preview: string;
  gradient: string;
};

const cardStyles: CardStyle[] = [
  {
    id: 'interactive-face',
    name: 'Interactive Face',
    description: 'A playful card with a face that gets sadder when you hover over "No"',
    preview: '😊',
    gradient: 'from-pink-100 via-red-100 to-rose-200',
  },
  // Add more styles here in the future
];

export default function Home() {
  const router = useRouter();
  const [requestorName, setRequestorName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('interactive-face');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!requestorName.trim()) {
      newErrors.requestorName = 'Your name is required';
    }

    if (!recipientName.trim()) {
      newErrors.recipientName = "Recipient's name is required";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required for SMS notifications';
    } else if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g., +1234567890)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Build URL with query parameters
    const params = new URLSearchParams({
      style: selectedStyle,
      requestor: requestorName.trim(),
      recipient: recipientName.trim(),
      phone: phoneNumber.trim(),
    });

    // Navigate to card page
    router.push(`/card?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
            💝 Create Your Valentine's Card
          </h1>
          <p className="text-lg text-pink-500">
            Send a special message to someone special
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requestor Name */}
          <div>
            <label htmlFor="requestorName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="requestorName"
              value={requestorName}
              onChange={(e) => setRequestorName(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.requestorName ? 'border-red-500' : 'border-pink-200'
              }`}
              placeholder="Enter your name"
            />
            {errors.requestorName && (
              <p className="mt-1 text-sm text-red-500">{errors.requestorName}</p>
            )}
          </div>

          {/* Recipient Name */}
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.recipientName ? 'border-red-500' : 'border-pink-200'
              }`}
              placeholder="Enter recipient's name"
            />
            {errors.recipientName && (
              <p className="mt-1 text-sm text-red-500">{errors.recipientName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Your Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-pink-200'
              }`}
              placeholder="+1234567890"
            />
            <p className="mt-1 text-sm text-gray-500">
              We'll send you an SMS when they say yes! 💖
            </p>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Card Style Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Card Style <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cardStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`relative border-2 rounded-xl cursor-pointer transition-all overflow-hidden ${
                    selectedStyle === style.id
                      ? 'border-pink-500 shadow-lg ring-2 ring-pink-200'
                      : 'border-pink-200 hover:border-pink-300 hover:shadow-md'
                  }`}
                >
                  {/* Preview Snapshot - Square */}
                  <div className="aspect-square relative">
                    <CardStylePreview styleId={style.id} gradient={style.gradient} />
                    
                    {/* Overlay with selection indicator */}
                    {selectedStyle === style.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Style Info */}
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{style.name}</h3>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Create My Card 💕
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>After creating your card, share the link with your special someone!</p>
        </div>
      </div>
    </div>
  );
}
