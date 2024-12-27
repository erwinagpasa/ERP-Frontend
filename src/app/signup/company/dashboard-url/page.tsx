'use client'
import { ADD_DASHBOARD_URL } from '@/app/graphql/mutation/dashboardUrl';
import useUserStore from '@/app/zustand/userStore';
import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function DashboardUrl() {
  const userEmail = useUserStore((state) => state.userEmail);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [dashboard_url, setDashboardUrl] = useState('');
  const [addDashboardUrl, { loading }] = useMutation(ADD_DASHBOARD_URL);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const createHandler = async () => {
    if (dashboard_url.trim() === '') {
      setErrorMessage('Dashboard URL is required!');
      return;
    } else {
      setErrorMessage('');
    }

    try {
      const response = await addDashboardUrl({
        variables: {
          input: {
            dashboard_url: dashboard_url,
            email: userEmail,
          },
        },
      });

      if (response.data) {
        setIsSignupSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 10000));
        router.push('/signin');
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
    <>
      {isSignupSuccess ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className='text-center flex flex-col items-center justify-center'>

            <div role="status" className="flex justify-center">
              <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>

            <p className="text-lg font-bold text-center mt-3">Registration Completed Successfully!</p>
            <p className="text-sm text-center">Preparing your personalized dashboard...</p>
          </div>
        </div>
      ) : (
        <form>
          <div className="flex flex-col items-center justify-center h-screen">
            <div>
              <div>
                <p className="inline-block text-base">Enter your company&lsquo;s dashboard URL</p>
              </div>
              <div>
                <div className="inline-flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-lg">
                    https://erp.devph.io/dashboard/
                  </span>

                  <input type="text"
                    autoComplete="off"
                    value={dashboard_url}
                    onChange={(e) => setDashboardUrl(e.target.value)}
                    required
                    className="rounded-none rounded-e-lg border text-gray-900 inline-flex flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="your-company-name" />
                </div>

                <button type="button" onClick={createHandler}
                  className="w-[150px] justify-center ml-4 mt-4 inline-flex py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
                {errorMessage ? (
                  <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                ) : (
                  <p className="mt-1 text-sm text-white">.</p>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
