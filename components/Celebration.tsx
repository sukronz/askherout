import React, { useEffect, useState } from 'react';
import { FloatingHearts } from './FloatingHearts';
import { getRomanticMessage } from '../services/gemini';
import { Heart, Loader2 } from 'lucide-react';

interface CelebrationProps {
  name: string;
}

export const Celebration: React.FC<CelebrationProps> = ({ name }) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchMessage = async () => {
      const msg = await getRomanticMessage(name);
      if (mounted) {
        setMessage(msg);
        setLoading(false);
      }
    };

    fetchMessage();

    return () => {
      mounted = false;
    };
  }, [name]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 md:p-6 text-center">
      <FloatingHearts />
      
      <div className="z-10 bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md md:max-w-2xl border-4 border-rose-300 transform animate-[pulse_3s_ease-in-out_infinite] my-4">
        
        <div className="flex justify-center mb-4 md:mb-6">
           <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-600 fill-rose-600 animate-ping absolute opacity-20" />
           <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-600 fill-rose-600 relative" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-hand font-bold text-rose-600 mb-4 md:mb-6 leading-tight">
          YAAAY! ❤️
        </h1>

        <div className="space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-medium">
            I knew you'd say yes, {name}!
          </p>
          
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-rose-50 rounded-xl border border-rose-100 min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col md:flex-row justify-center items-center py-2 text-rose-400">
                <Loader2 className="animate-spin w-5 h-5 md:w-6 md:h-6 mb-2 md:mb-0 md:mr-2" />
                <span className="text-sm md:text-base">Finding the perfect movie quote...</span>
              </div>
            ) : (
              <p className="text-base sm:text-lg md:text-xl text-rose-800 italic font-hand leading-relaxed">
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-500">
          Get ready for the best Valentine's Day ever.
        </div>
      </div>
    </div>
  );
};