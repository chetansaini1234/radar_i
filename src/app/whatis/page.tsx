"use client";

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/card';

export default function WhatIs() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white overflow-auto">
      <header className="p-6">
        <div className="w-32 h-16">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_i-lcYESZp5zUHhmnoNxl1TG55485IMrT.png"
            alt="3D 'i' Logo"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center p-10">
        <Card className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg overflow-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">How It Works</CardTitle>
            <CardDescription>
              At Project Insure, we’re revolutionizing life insurance by leveraging blockchain technology to make it more affordable, transparent, and accessible to everyone, regardless of geographical location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Premium Payments</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Affordable Premiums: Users pay a low monthly premium in our native I tokens. For example, you might pay $10 worth of I tokens per month for coverage.</li>
                <li>Deflationary Token Model: 90% of the premium tokens are burned, reducing the overall token supply and potentially increasing the value of the remaining tokens.</li>
                <li>Operational Costs: The remaining 10% of the premium tokens are allocated to the company’s operational wallet to cover administrative expenses, development, and other costs.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">2. Coverage and Policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transparent and Immutable Records: All insurance policies are recorded on the blockchain, providing clear and unchangeable records that enhance trust and transparency.</li>
                <li>Worldwide Coverage: Our platform offers life insurance to individuals globally, overcoming traditional geographical limitations.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Claims Process</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Initiating a Claim: In the event of a policyholder’s passing, the nominee can initiate a claim through our platform.</li>
                <li>Verification and more...</li>
              </ul>
            </section>
          </CardContent>
          <div className="px-6 pb-6">
            <p className="text-center">Join Project Insure today to secure your future and provide peace of mind for your loved ones with our innovative, blockchain-powered life insurance solutions.</p>
          </div>
        </Card>
      </main>
      <footer className="p-6">
        Footer Content
      </footer>
    </div>
  );
}