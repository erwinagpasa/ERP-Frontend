'use client';
import { MainNavbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Overview } from "./widgets/overview";
import { ActiveOrders } from "./widgets/active-orders";
import { GoogleMappage } from "./widgets/google-map";
import data from "./data/profile.json";
import { UserList } from "./widgets/user-list";
import { Address } from "./widgets/address";
import { ContactForm } from "./widgets/contact-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Helper function to calculate time units
const calculateTimeLeft = (countDownDate: Date) => {
  const now = new Date().getTime();
  const distance = countDownDate.getTime() - now;

  if (distance < 0) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    months: Math.floor(distance / (1000 * 60 * 60 * 24 * 30)),
    days: Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  };
};

export default function Home() {
  const router = useRouter();
  const [showModalDonor] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countDownDate = new Date('2025-06-30T23:59:59');

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(countDownDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.push('/signup/company');
    }, 5000);
  }, [router]);

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
      <MainNavbar />
      <Sidebar />
      <div className="h-full ml-14 mt-20 mb-10 md:ml-64">
        <Overview />
        <div className="p-4">
          <div className="flex flex-row">
            <div className="flex-initial  w-2/5 pr-2 hidden md:block">
              <ActiveOrders />
            </div>
            <div className="flex-initial max-sm:w-full w-3/5 pl-3 ">
              <GoogleMappage />
            </div>
          </div>
        </div>
        <UserList data={data} />
        <div className="mt-8 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Address />
            <ContactForm />
          </div>
        </div>
      </div>

      {showModalDonor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-full lg:w-4/12 bg-white p-6 rounded-lg shadow-lg relative">
            <div className="space-y-6 mt-4">
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{timeLeft.months}</span>
                  <p className="text-gray-600">Months</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{timeLeft.days}</span>
                  <p className="text-gray-600">Days</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{timeLeft.hours}</span>
                  <p className="text-gray-600">Hours</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{timeLeft.minutes}</span>
                  <p className="text-gray-600">Minutes</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{timeLeft.seconds}</span>
                  <p className="text-gray-600">Seconds</p>
                </div>
              </div>
              <p className="text-gray-600 text-center mt-4">Our new feature is under development. Stay tuned!</p>

              <div className="flex justify-center">
                <a
                  href="/signup/company"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}