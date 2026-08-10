'use client';

import { useState } from 'react';
import { ArrowLeft, Mic, Pencil, Camera, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChooseFormat() {
  const router = useRouter();
  // Using an array because the prompt says "Choose one or more"
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const formats = [
    { 
      id: 'voice', 
      title: 'Voice', 
      desc: 'Record and preserve spoken memories',
      icon: Mic 
    },
    { 
      id: 'writing', 
      title: 'Writing', 
      desc: 'Write stories in your own words',
      icon: Pencil 
    },
    { 
      id: 'photos', 
      title: 'Photos', 
      desc: 'Capture and save special moments',
      icon: Camera 
    }
  ];

  const toggleFormat = (id: string) => {
    setSelectedFormats(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center px-6 py-8 font-sans">
      <div className="w-full max-w-md">
  
        {/* Headers */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-stone-800 mb-2">
            How would you like to<br />preserve your memories?
          </h1>
          <p className="text-stone-500 text-sm">
            Choose one or more that you love.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {formats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormats.includes(format.id);
            
            return (
              <button
                key={format.id}
                onClick={() => toggleFormat(format.id)}
                className={`relative flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#1a3628] bg-[#f2f7f4]' 
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                {/* Green Checkmark Badge for Selected Items */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#1a3628] rounded-full p-0.5">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                )}
                
                <div className="h-10 flex items-center justify-center mb-4">
                  <Icon size={36} strokeWidth={1.5} className="text-[#1a3628]" />
                </div>
                <span className="text-base font-semibold text-stone-800 mb-1">
                  {format.title}
                </span>
                <span className="text-xs text-stone-500 leading-tight">
                  {format.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => router.push('/handwritten-note')}
          disabled={selectedFormats.length === 0}
          className={`w-full py-4 rounded-xl text-center font-medium transition-colors ${
            selectedFormats.length > 0 
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