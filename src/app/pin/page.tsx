'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

export default function InputPin() {
  const router = useRouter();
  const [pin, setPin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleComplete = async (value: string) => {
    if (value.length === 6) {
      setLoading(true);
      try {
        await router.push('/');
      } finally {
        setLoading(false);
      }
    }
  }


  return (
    <section className="bg-gray-50">
      <div className="flex items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full justify-center items-center bg-gray-50 p-4">
          <div className="card bg-white lg:w-[450px] mx-auto rounded-xl shadow-lg">
            <div className="card-body px-12 pt-12 pb-6">
              <div className="flex items-center justify-center">
                <Image
                  className="image mr-2 rounded-full overflow-hidden"
                  src="/logo_auth.png"
                  alt="erwin agpasa"
                  width={45}
                  height={45}
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-center">ERP Software</h2>

              <p className="text-center mt-8">Enter your PIN Number</p>
              <form className="space-y-4 md:space-y-6 flex justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={pin}
                  onChange={setPin}
                  onComplete={handleComplete}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </form>
              {loading && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            <div className="card-footer bg-gray-100 p-6 rounded-b-lg">
              <p className="text-sm text-gray-600 text-center">
                <Link href="/signin" className="text-blue-600 hover:text-blue-700">Having trouble logging in?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
