'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Signin() {
  const router = useRouter();

  const [company, setCompany] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isCompanySelected, setIsCompanySelected] = useState(false);

  //! TODO: Replace this with actual company list
  const companyList = ['Company One', 'Company Two', 'Company Three', 'Another Company'];

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompany(value);
    setIsCompanySelected(false);
    if (value) {
      const filteredSuggestions = companyList.filter((comp) =>
        comp.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCompany(suggestion);
    setSuggestions([]);
    setIsCompanySelected(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (company.trim() === '') {
        setErrorMessage('Company name is required!');
      } else {
        setErrorMessage('');
      }
      setSuggestions([]);
    }, 150);
  };

  const handleClearCompany = () => {
    setCompany('');
    setIsCompanySelected(false);
    setSuggestions([]);
  };

  const handleFormSubmit = () => {
    router.push('/pin');
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

              <p className="text-center mb-4 mt-8">Welcome back! Please sign in to continue</p>
              <form className="space-y-4 md:space-y-6">
                <div className="mb-5 w-full relative">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Enter company name"
                    className={`${isCompanySelected ? 'bg-gray-100' : 'bg-white'} border ${errorMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-3`}
                    value={company}
                    onChange={handleCompanyChange}
                    onBlur={handleBlur}
                    readOnly={isCompanySelected}
                  />
                  {isCompanySelected && (
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 text-sm"
                      onClick={handleClearCompany}
                    >
                      Clear
                    </button>
                  )}
                  {suggestions.length > 0 && !isCompanySelected && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to select before blur
                          className="cursor-pointer p-2 hover:bg-gray-100"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full text-sm p-3"
                    placeholder="Enter your email"
                  />
                </div>
                <button type="button" onClick={handleFormSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center w-full" aria-label="Sign In">Sign In</button>
              </form>
            </div>

            <div className="card-footer bg-gray-100 p-6 rounded-b-lg">
              <p className="text-sm text-gray-600 text-center">
                Don&apos;t have an account yet? <Link href="/signup/company" className="text-blue-600 hover:text-blue-700">Sign up</Link>
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
