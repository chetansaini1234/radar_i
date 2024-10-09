// ConnectionPage.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { InsurancePage } from '@/components/InsurancePage';
import { ClaimPage } from '@/components/ClaimPage';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useRouter } from 'next/navigation';


export function ConnectionPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
    script.type = 'module';
    script.onload = () => setSplineLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black">
      {splineLoaded && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <spline-viewer
            url="https://prod.spline.design/SHH-JPca4GBBBwxe/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      <header className="absolute top-0 left-0 right-0 h-24 flex justify-between p-6 z-20">
        <div className="relative w-16 h-16 ml-[12%]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_i-lcYESZp5zUHhmnoNxl1TG55485IMrT.png"
            alt="3D 'i' Logo"
            fill
            style={{ objectFit: 'contain' }}
            quality={100}
          />
        </div>
        <div className="mr-[12%]">
          <WalletMultiButton />
        </div>
      </header>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      <footer className="absolute bottom-0 left-0 right-0 h-24 flex justify-center space-x-8 p-6 z-20">
      <button 
          className="text-white hover:underline"
          onClick={() => router.push('/whatis')}
        >
          What is INSURE
        </button>
        <button className="text-white hover:underline">Roadmap</button>
        <InsurancePage />
        <ClaimPage />
      </footer>
      {/* MVP/PROTOTYPE Card */}
      <div className="absolute bottom-6 right-6 w-30 h-12 bg-red-600 flex items-center justify-center rounded-lg shadow-lg z-30">
        <span className="text-black font-bold text-lg">MVP/PROTOTYPE</span>
      </div>
    </div>
  );
}