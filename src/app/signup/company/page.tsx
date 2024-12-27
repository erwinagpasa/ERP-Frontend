'use client'
import React, { useState } from 'react';
import { SIGNUP_COMPANY } from '@/app/graphql/mutation/user';
import { useMutation } from '@apollo/client';
import { ApolloError } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/zustand/userStore';
import countryCodes from '../../data/countryCodes.json';

export default function SignupCompany() {
  const updateEmail = useUserStore((state) => state.updateEmail);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [area_code, setAreaCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalDonor, setShowModalDonor] = useState(false);

  const [errorCompanyMessage, setErrorCompanyMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
  const [errorAreaCodeMessage, setErrorAreaCodeMessage] = useState('');
  const [signupCompany, { loading }] = useMutation(SIGNUP_COMPANY);

  const handleBlur = () => {
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
    } else {
      setErrorMessage('');
    }
  };

  const createHandler = async () => {
    if (company.trim() === '') {
      setErrorCompanyMessage('Company name is required!');
      return;
    } else {
      setErrorCompanyMessage('');
    }

    if (email.trim() === '') {
      setErrorMessage('Email address is required!');
      return;
    } else if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    } else {
      setErrorMessage('');
    }

    if (area_code.trim() === '') {
      setErrorAreaCodeMessage('Area code is required!');
      return;
    } else {
      setErrorAreaCodeMessage('');
    }

    if (phone.trim() === '') {
      setErrorPhoneMessage('Phone number is required!');
      return;
    } else {
      setErrorPhoneMessage('');
    }

    try {
      const response = await signupCompany({
        variables: {
          input: {
            company: company,
            email: email,
            area_code: area_code,
            phone: phone,
          },
        },
      });

      if (response.data) {
        updateEmail(email);
        router.push('/signup/company/dashboard-url');
        console.log('Signup successful.');
      }
    } catch (error) {
      const apolloError = error as ApolloError;

      if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
        const message = apolloError.graphQLErrors[0].message;
        setErrorMessage(message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      console.error('Error during signup:', apolloError);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50">
      <div className="md:flex flex-row justify-between flex-grow container mx-auto">
        <div className="w-full md:w-1/2 hidden lg:flex md:hidden flex-col min-h-screen justify-center items-center bg-gray-50 p-4">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <Image
                className="image mr-2 rounded-full overflow-hidden"
                src="/logo_auth.png"
                alt="erwin agpasa"
                width={50}
                height={50}
                priority
              />
            </div>
            <h2 className="text-2xl font-bold text-center">ERP Software</h2>
            <p className="text-center mt-3">
              Streamline your business operations with our comprehensive ERP system.
              Manage your finances, inventory, and customer relationships in one place.
            </p>

            <div className="flex flex-col items-center justify-center mt-4">
              <button className="hover:bg-blue-600 bg-gray-200 hover:text-white text-gray-600 px-4 py-2 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <a href="https://github.com/erwinagpasa/ERP-Frontend" target="_blank" rel="noopener noreferrer">Download on GitHub</a>
              </button>
            </div>

            <button onClick={() => setShowModal(true)} className="mt-8 text-blue-600 hover:text-blue-700">Support this project with a donation</button>
            <button onClick={() => setShowModalDonor(true)} className="mt-2 text-sm text-gray-600 hover:text-blue-700">List of Donors</button>
          </div>
        </div>

        <div className="md:flex lg:w-1/2 flex-row justify-between flex-grow">
          <div className="w-full flex flex-col min-h-screen justify-center items-center bg-gray-50 p-4">
            <div className="card bg-white rounded-xl shadow-lg">
              <div className="card-body px-12 pt-12 pb-6">
                <h2 className="text-2xl font-bold">Create an account</h2>
                <p className="mb-5">Enter your company information below to create your account.</p>

                <form className="mx-auto w-full max-w-md" autoComplete="off">
                  <div className="mb-5 w-full">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
                    <input type="text"
                      required
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`shadow-sm border ${errorCompanyMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                    />
                    {errorCompanyMessage && <p className="text-red-500 text-xs mt-1">{errorCompanyMessage}</p>}
                  </div>

                  <div className="mb-5 w-full">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleBlur}
                      className={`shadow-sm border ${errorMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5 `}
                      required
                    />
                    {errorMessage && (
                      <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>

                  <div className="mb-5 w-full">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <div className="flex items-center">
                      <select
                        value={area_code}
                        onChange={(e) => setAreaCode(e.target.value)}
                        className={`shadow-sm border ${errorAreaCodeMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 appearance-none`}
                        required
                      >
                        <option value="">Area Code</option>
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                      </select>

                      <input type="text"
                        required
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`shadow-sm border ${errorPhoneMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 ml-2`}
                      />
                    </div>
                    {errorAreaCodeMessage && <p className="text-red-500 text-xs mt-1">{errorAreaCodeMessage}</p>}
                    {errorPhoneMessage && <p className="text-red-500 text-xs mt-1">{errorPhoneMessage}</p>}
                  </div>

                  <button type="button" onClick={createHandler} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center w-full ${loading ? 'disabled opacity-50' : ''}`}>
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <span>Register new account</span>
                    )}
                  </button>
                  <p className="text-sm p-5 text-center">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                </form>
              </div>
              <div className="card-footer bg-gray-100 p-6 rounded-b-lg">
                <p className="text-sm text-gray-600 text-center">Already have an account? <Link href="/signin" className="text-blue-600 hover:text-blue-700">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-6/12 bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Support this project</h2>

            <div className="space-y-6">
              <p className="text-gray-600">
                Your support helps us continue to develop and improve this project.
              </p>

              <ul className="list-disc pl-8 space-y-3">
                <li className="text-gray-700">
                  <span className="font-semibold">Development Costs:</span> Developing and maintaining software requires significant time and resources. Donations can help cover these costs.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Hosting and Infrastructure:</span> Running a web application involves costs for servers, databases, and other infrastructure.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Continuous Improvement:</span> Donations can fund ongoing improvements, new features, and bug fixes.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Support and Documentation:</span> Providing user support and maintaining documentation can be resource-intensive.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Sustainability:</span> Donations help ensure the long-term sustainability of the project, allowing you to continue providing value to users.
                </li>
              </ul>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="https://paypal.me/erwinagpasa?country.x=PH&locale.x=en_US"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Donate via PayPal
              </a>
            </div>
          </div>
        </div>
      )}


      {showModalDonor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-6/12 bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModalDonor(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">List of Donors</h2>

            <div className="space-y-6">
              <p className="text-gray-600">
                Thank you to all our donors for their generous support. Your contributions help us continue to develop and improve this project.
              </p>

              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <a href='/' target='_blank'>.</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Donor</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <a href='/' target='_blank'>.</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Donor</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}