'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Heart, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WhoIsThisFor() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: 'parents', label: 'My parents', icon: Users },
    { id: 'grandparents', label: 'My grandparents', icon: Users },
    { id: 'family', label: 'My family', icon: Users },
    { id: 'special', label: 'Someone special', icon: Heart, iconColor: 'text-red-500' },
    // "Myself" removed as requested
    { id: 'other', label: 'Other', icon: MoreHorizontal, iconColor: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center px-6 py-8 font-sans">
      <div className="w-full max-w-md">
        {/* Headers */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-stone-800 mb-2">
            Who are you creating<br />this memoir for?
          </h1>
          <p className="text-stone-500 text-sm">
            This helps us personalize your experience.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#1a3628] bg-[#f2f7f4]' 
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="h-12 flex items-center justify-center mb-3">
                  <Icon size={40} strokeWidth={1.5} className={option.iconColor || 'text-stone-700'} />
                </div>
                <span className="text-sm font-medium text-stone-800">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => router.push('/handwritten-note')}
          disabled={!selected}
          className={`w-full py-4 rounded-xl text-center font-medium transition-colors ${
            selected 
              ? 'bg-[#1a3628] text-white hover:bg-[#132a1e]' 
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}